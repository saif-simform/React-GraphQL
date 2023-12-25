import React, { useEffect, useState } from "react";
import { ArrowLeft, Edit, Eye } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Button,
  Tooltip,
  Container,
} from "reactstrap";
import Loader from "../../components/Loader";
import {
  NoRecordsFound,
  TableLoadingText,
} from "../../components/TableLoadingText";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar";
import CreateTaskLogModal from "../timeLogs/CreateTaskLogModel";
import { GET_TASKS } from "../../graphql/graphQLOperations/queries";
import { useMutation } from "@apollo/client";

const Project = () => {
  const navigate = useNavigate();
  const { id, projectName } = useParams();
  const [getTaskByProjectId, { loading }] = useMutation(GET_TASKS);

  const [showLoader, setShowLoader] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [formModal, setFormModal] = useState(false);
  const [taskElelement, setTaskElelement] = useState(null);
  const [tooltipEditOpen, setTooltipEditOpen] = useState(false);
  const [tooltipViewOpen, setTooltipViewOpen] = useState(false);
  const [toolTipBackButton, setTooltipBackButton] = useState(false);
  const toggleEdit = () => setTooltipEditOpen(!tooltipEditOpen);
  const toggleView = () => setTooltipViewOpen(!tooltipViewOpen);
  const toggleBack = () => setTooltipBackButton(!toolTipBackButton);

  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    try {
      setShowLoader(loading);
      const { data } = await getTaskByProjectId({
        variables: { id: id },
      });
      setDataList(
        data.getTaskByProjectId || []
      );

    } catch (err) {
      console.log(err)
    } finally {
      setShowLoader(loading);
    }
  };

  let listItems;
  if (dataList.length > 0) {
    listItems = dataList.map((element) => {
      return (
        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.taskName}</td>
          <td>{projectName}</td>
          <td className="text-left" width={200}>
            {" "}
            <Button id="TooltipView" color="primary" className="me-3">
              <Edit
                className="cursor-pointer"
                size={20}
                onClick={() => {
                  setTaskElelement(element)
                  setFormModal(true);
                }}
              />
            </Button>
            <Tooltip
              placement="top"
              isOpen={tooltipEditOpen}
              target="TooltipView"
              toggle={toggleEdit}
            >
              Edit
            </Tooltip>
            <Button id="TooltipEdit" color="primary">
              <Eye
                className="cursor-pointer"
                size={20}
                onClick={() =>
                  navigate(`/projects/${projectName}/task/${element.id}`)
                }
              />
            </Button>
            <Tooltip
              placement="top"
              isOpen={tooltipViewOpen}
              target="TooltipEdit"
              toggle={toggleView}
            >
              View
            </Tooltip>
          </td>
        </tr>
      );
    });
  } else {
    listItems = <NoRecordsFound colSpan={8} />;
  }
  return (
    <>
      <NavBar />
      <Container fluid>
        <Card className="list_wrapper mt-4">
          {showLoader && <Loader />}
          <CardHeader className="table-title d-flex align-items-center">
            <div className="float-right me-2">
              <Button
                //   outline
                id="BackButton"
                color="primary"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={16} className="fonticon-wrap" />
              </Button>
              <Tooltip
                placement="top"
                isOpen={toolTipBackButton}
                target="BackButton"
                toggle={toggleBack}
              >
                Back
              </Tooltip>
            </div>
            <CardTitle>Task List</CardTitle>
          </CardHeader>
          <CardBody>
            <Table className="table-fill w-100">
              <thead>
                <tr className="table-active">
                  <th className="cursor-pointer">Task ID</th>
                  <th className="cursor-pointer">Task Name</th>
                  <th className="cursor-pointer">Project Name</th>
                  <th className="cursor-pointer">Action</th>
                </tr>
              </thead>
              <tbody>
                {showLoader ? <TableLoadingText colSpan={8} /> : listItems}
              </tbody>
            </Table>
            {formModal && (
              <CreateTaskLogModal
                taskElelement={taskElelement}
                onSave={() => {
                  setFormModal(false);
                  setTaskElelement(null);
                }}
                onCancel={() => {
                  setFormModal(false);
                  setTaskElelement(null);
                }}
              />
            )}
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Project;
