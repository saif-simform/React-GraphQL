import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Container,
  Tooltip,
  Button,
} from "reactstrap";
import Loader from "../../components/Loader";
import {
  NoRecordsFound,
  TableLoadingText,
} from "../../components/TableLoadingText";
import NavBar from "../NavBar";
import { useQuery } from "@apollo/client";
import { GET_ALL_PROJECTS } from "../../graphql/graphQLOperations/queries";

const Projects = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const { data, loading } = useQuery(GET_ALL_PROJECTS);

  useEffect(() => {
    getProjectList();
  }, [data]);

  const getProjectList = async () => {
    setShowLoader(loading);
    try {
      setDataList(data.projects || []);
    } catch {
      setDataList([]);
    } finally {
      setShowLoader(loading);
    }
  };

  let listItems;
  if (dataList.length > 0) {
    listItems = dataList.map((element, index) => {
      return (
        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.projectName}</td>
          <td>{element.description}</td>
          <td className="text-left">
            {" "}
            <Button id="TooltipView" color="primary">
              <Eye
                className="cursor-pointer"
                size={20}
                onClick={() =>
                  navigate(`/projects/${element.projectName}/${element.id}`)
                }
              />
            </Button>
            <Tooltip
              placement="top"
              isOpen={tooltipOpen}
              target="TooltipView"
              toggle={toggle}
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
          <CardHeader className="table-title">
            <CardTitle>Project List</CardTitle>
          </CardHeader>
          <CardBody>
            <Table className="table-fill w-100">
              <thead>
                <tr className="table-active">
                  <th className="cursor-pointer">Project ID</th>
                  <th className="cursor-pointer">Project Name</th>
                  <th className="cursor-pointer">Description</th>
                  <th className="cursor-pointer">Task</th>
                </tr>
              </thead>
              <tbody>
                {showLoader ? <TableLoadingText colSpan={8} /> : listItems}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Projects;
