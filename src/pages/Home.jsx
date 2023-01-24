import { useStates } from "../assets/states.js";
import { Container, Row, Col } from "react-bootstrap";
import ChatSidebar from "../components/ChatSidebar";
import RightSidebar from "../components/RightSidebar.jsx";
import TypeChat from "../components/TypeChat";

function Home() {
  const u = useStates("user");

  return (
    <div style={{ color: "#fff" }} className="App">
      <Container fluid>
        <Row>
          <Col style={{ paddingLeft: 0 }} xs={2}>
            <ChatSidebar />
          </Col>
          <Col xs={8} className="d-flex justify-content-center align-items-end">
            <TypeChat />
          </Col>
          <Col style={{ paddingRight: 0 }} xs={2}>
            <RightSidebar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
