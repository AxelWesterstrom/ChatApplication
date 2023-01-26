import { Col } from "react-bootstrap";
import "../css/chatCard.css";

function ChatCard(user) {
  function inviteUser() {
    alert("Inviting the user" + JSON.stringify(user, "", "  "));
  }

  return (ChatCard = (
    <>
      <Col onClick={() => inviteUser(user)}> {user.username}</Col>
      <hr />
    </>
  ));
}

export default ChatCard;
