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

function Register() {
  const navigate = useNavigate();
  let log = useStates("login");
  let u = useStates("user");
  let l = useStates({
    username: "",
    password: "",
    passwordCheck: "",
  });

  const handleClose = () => setShow(false);
  const [show, setShow] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  async function registerAttempt(event) {
    event.preventDefault();
    if (
      l.username.length == 0 ||
      l.password.length == 0 ||
      l.passwordCheck.length == 0
    ) {
      setErrorMessage("All fields must be entered");
      setShow(true);
      return;
    } else if (l.password !== l.passwordCheck) {
      setErrorMessage("Lösenorden matchade inte");
      setShow(true);
      return;
    }

    let user = await (
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: l.username,
          password: l.password,
          userRole: "user",
          loggedIn: 1,
        }),
      })
    ).json();

    if (
      user._error === "SqliteError: UNIQUE constraint failed: users.username"
    ) {
      setErrorMessage("Username already in use");
      setShow(true);
    } else {
      // Registration successful now log in the user automatically
      let user = await (
        await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: l.username,
            password: l.password,
          }),
        })
      ).json();

      if (user._error) {
        setErrorMessage("Wrong username or password");
        setShow(true);
      } else {
        log.login = "true";
        Object.assign(u, user);
      }
      navigate("/");
    }
  }

  function goToLogin() {
    navigate("/");
  }

  return (Register = (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="rounded mg-10">
          <Form.Group>
            <Form
              className="rounded p-4 p-sm-3"
              onSubmit={registerAttempt}
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
              <Col>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    {...l.bind("passwordCheck")}
                  />
                </Form.Group>
              </Col>
              <ButtonGroup
                vertical
                className="d-flex justify-content-center align-items-center"
              >
                &nbsp;<Button type="submit">Register</Button> &nbsp;
                <Button onClick={goToLogin}>Cancel</Button>
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

export default Register;
