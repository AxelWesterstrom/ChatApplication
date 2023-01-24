import { Col } from "react-bootstrap";
import avatar from "../assets/avatar.svg";
import "../css/chatCard.css";
import { useEffect } from "react";

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
