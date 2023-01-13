import React from "react";
// import { useState } from "react";
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

// import { useNavigate } from "react-router-dom";
// import { useStates } from "../assets/helpers/states";

function LoginForm() {
  // let log = useStates("login");
  // let u = useStates("user");
  // const navigate = useNavigate();

  // let l = useStates({
  //   email: "",
  //   password: "",
  // });

  // const handleClose = () => setShow(false);
  // const [errorMessage, setErrorMessage] = useState("");

  // function login(event) {
  //   event.preventDefault();
  //   loginAttempt();
  // }

  // async function loginAttempt() {
  //   const customer = await (
  //     await fetch(`/api/customers?email=${l.email}`)
  //   ).json();
  //   if (l.email.length === 0 || l.password.length === 0) {
  //     setErrorMessage("Fyll i både email och lösenord  ");
  //     setShow(true);
  //   } else if (customer === 0) {
  //     setErrorMessage("Fel e-post eller lösenord ");
  //     setShow(true);
  //   } else {
  //     const customerInfo = Object.values(customer);
  //     const correctPassword = customerInfo[0].password;
  //     const customerId = customerInfo[0].id;
  //     u.customerId = customerId;
  //     if (correctPassword == l.password) {
  //       setErrorMessage("Välkommen!");
  //       setShow(true);
  //       log.login = "true";
  //       u.email = l.email;
  //       u.showMessage = "login";
  //       navigate("/");
  //     } else {
  //       setErrorMessage("Fel e-post eller lösenord  ");
  //       setShow(true);
  //     }
  //   }
  // }

  // function goToRegister() {
  //   navigate("/skapa-konto");
  // }
  // const [show, setShow] = useState();

  return (LoginForm = (
    <>
      <Container className="login">
        <Row className="form-row">
          <Col className=" login-form-col">
            <Form.Group className="login-form">
              <Form autoComplete="off">
                <Row>
                  <FormLabel className="login-label">Username </FormLabel>
                  <FormControl type="email" />
                </Row>
                <Row>
                  <FormLabel className="login-label">Password </FormLabel>
                  <FormControl type="password" />
                </Row>
                <Button type="submit" className="login-button">
                  Log in
                </Button>
                <Button className="login-button">Create an account</Button>
              </Form>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </>
  ));
}

export default LoginForm;
