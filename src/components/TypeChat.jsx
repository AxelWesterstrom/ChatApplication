import { InputGroup, Form, Button } from "react-bootstrap";
import avatar from "../assets/avatar.svg";
import "../css/typeChat.css";

function TypeChat() {
  return (TypeChat = (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Message"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button
          className="send-message"
          variant="outline-secondary"
          id="send-message"
        >
          Send
        </Button>
      </InputGroup>
    </>
  ));
}

export default TypeChat;
