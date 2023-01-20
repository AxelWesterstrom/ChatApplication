import React from "react";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  ButtonGroup,
} from "react-bootstrap";
import "../css/login.css";
import { useStates } from "../assets/states.js";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm() {
  let log = useStates("login");
  let u = useStates("user");
  const navigate = useNavigate();

  let l = useStates({
    username: "",
    password: "",
  });

  function handleClose() {
    setShow(false);
    if (u.username !== "") {
      window.location.reload(false);
    }
  }

  const [errorMessage, setErrorMessage] = useState("");

  async function loginAttempt(event) {
    event.preventDefault();

    if (l.username.length === 0 || l.password.length === 0) {
      setErrorMessage("Enter both username and password");
      setShow(true);
      return;
    }

    let user = await (
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: l.username, password: l.password }),
      })
    ).json();

    if (user._error) {
      setErrorMessage("Wrong username or password");
      setShow(true);
    } else {
      log.login = "true";
      Object.assign(u, user);
    }
  }

  function goToRegister() {
    navigate("/create-account");
  }
  const [show, setShow] = useState();

  return (LoginForm = (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="rounded mg-10">
          <Form.Group>
            <Form
              className="rounded p-4 p-sm-3"
              onSubmit={loginAttempt}
              autoComplete="off"
            >
              <Col md>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username </Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                    {...l.bind("username")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    {...l.bind("password")}
                  />
                </Form.Group>
              </Col>
              <ButtonGroup
                vertical
                className="d-flex justify-content-center align-items-center"
              >
                &nbsp;<Button type="submit">Log in</Button> &nbsp;
                <Button onClick={goToRegister}>Create an account</Button>
              </ButtonGroup>
            </Form>
          </Form.Group>
        </Row>
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
      </Container>
    </>
  ));
}

export default LoginForm;
