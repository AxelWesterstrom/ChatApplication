import React from "react";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormLabel,
  FormControl,
  Modal,
} from "react-bootstrap";
import styles from "../../public/css/login.css";
import { useStates } from "../assets/states.js";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  let log = useStates("login");
  let u = useStates("user");
  const navigate = useNavigate();

  let l = useStates({
    username: "",
    password: "",
  });

  const handleClose = () => setShow(false);
  const [errorMessage, setErrorMessage] = useState("");

  function login(event) {
    event.preventDefault();
    loginAttempt();
  }

  async function loginAttempt() {
    const user = await (await fetch(`/api/user?username=${l.username}`)).json();
    if (l.username.length === 0 || l.password.length === 0) {
      setErrorMessage("Fyll i både email och lösenord  ");
      setShow(true);
    } else if (user === 0) {
      setErrorMessage("Fel e-post eller lösenord ");
      setShow(true);
    } else {
      const userInfo = Object.values(user);
      const correctPassword = userInfo[0].password;
      const userId = userInfo[0].id;
      u.userId = userId;
      if (correctPassword == l.password) {
        setErrorMessage("Välkommen!");
        setShow(true);
        log.login = "true";
        u.email = l.email;
        u.showMessage = "login";
        navigate("/");
      } else {
        setErrorMessage("Fel e-post eller lösenord  ");
        setShow(true);
      }
    }
  }

  function goToRegister() {
    navigate("/create-account");
  }
  const [show, setShow] = useState();

  return (LoginForm = (
    <>
      <Container className="login">
        <Row className="form-row">
          <Col lg={6}>
            <Form.Group className="login-form">
              <Form onSubmit={login} autoComplete="off">
                <Row>
                  <FormLabel className="login-label">Username </FormLabel>
                  <FormControl
                    type="text"
                    autoComplete="username"
                    {...l.bind("user")}
                  />
                </Row>
                <Row>
                  <FormLabel className="login-label">Password </FormLabel>
                  <FormControl
                    type="password"
                    {...l.bind("password")}
                    autoComplete="current-password"
                  />
                </Row>
                <Button type="submit" className="custom-button">
                  Log in
                </Button>
                <Button className="custom-button" onClick={goToRegister}>
                  Create an account
                </Button>
              </Form>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <p className="custom-label">{errorMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="custom-button" onClick={handleClose}>
                    Stäng
                  </Button>
                </Modal.Footer>
              </Modal>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </>
  ));
}

export default LoginForm;
