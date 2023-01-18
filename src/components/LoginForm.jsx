import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import "../../public/css/login.css";
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
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="login-form">
          <Form.Group>
            <Form onSubmit={login} autoComplete="off">
              <Col md>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username </Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                    {...l.bind("user")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPassword">
                  <Form.Label>Username </Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="current-password"
                    placeholder="Password"
                    {...l.bind("password")}
                  />
                </Form.Group>
              </Col>
              <Button type="submit">Log in</Button>
              <Button onClick={goToRegister}>Create an account</Button>
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
