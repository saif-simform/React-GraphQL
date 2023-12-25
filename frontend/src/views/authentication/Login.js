import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Label,
  FormGroup,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/graphQLOperations/queries";
import { TOKEN_KEY, USER_KEY } from "../../configs/constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";



const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useLocalStorage(USER_KEY, {})
  const [tokenInstance, setTokenInstance] = useLocalStorage(TOKEN_KEY, '')
  const [showLoader, setShowLoader] = useState(false);

  const handleLogin = async (value) => {
    try {
      setShowLoader(loading);

      setValues(value);
      const { data } = await loginUser({
        variables: { ...value },
      });
      const { users, token } = data.loginUser
      // store token to localStorage
      !tokenInstance && setTokenInstance(token)

      // store user data to localStorage
      users && setUser({ ...users })

      user && navigate("/projects");
    } catch {
      console.log(error);
    } finally {
      setShowLoader(loading);
    }
  };
  return (
    <div className="login-wrapper">
      <Card className="bg-authentication login-card">
        <div className="text-center">
          <h3>Login</h3>
          <p>Welcome back, please login to your account.</p>
        </div>
        <Formik
          initialValues={values}
          onSubmit={async (values) => {
            handleLogin(values);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .required("Enter email")
              .email("Enter valid email"),
            password: Yup.string().required("Enter password"),
          })}
        >
          {(props) => {
            const {
              handleBlur,
              handleSubmit,
              handleChange,
              errors,
              values,
              touched,
            } = props;

            return (
              <>
                <Form onSubmit={handleSubmit}>
                  <Label> Email</Label>
                  <FormGroup className="position-relative">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                        }`}
                    />
                    {touched.email && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </FormGroup>
                  <Label>Password</Label>
                  <FormGroup className="position-relative">
                    <Input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                        }`}
                    />
                    {touched.password && errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </FormGroup>
                  <Button
                    block
                    color="primary"
                    type="submit"
                    disabled={showLoader}
                  >
                    {showLoader ? (
                      <>
                        <Spinner color="light" size="sm" type="grow" />
                        <span>Loading... </span>
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Form>
              </>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
