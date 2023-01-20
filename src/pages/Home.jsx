import { useStates } from "../assets/states.js";
import { Container, Row, Col } from "react-bootstrap";
import ChatSidebar from "../components/ChatSidebar";

function Home() {
  const u = useStates("user");

  async function logout() {
    let result = await (await fetch("/api/login", { method: "DELETE" })).json();
    u.username = "";
    u.password = "";
  }

  return (
    <div style={{ color: "#fff" }} className="App">
      <Container fluid>
        <Row>
          <Col style={{ paddingLeft: 0 }} xs={2} id="sidebar-wrapper">
            <ChatSidebar />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            this is a test
            <button onClick={logout}>Logga ut</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
