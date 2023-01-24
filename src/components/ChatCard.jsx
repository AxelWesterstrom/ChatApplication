import { Col } from "react-bootstrap";
import avatar from "../assets/avatar.svg";
import "../css/chatCard.css";
import UserCard from "./UserCard";
import { useEffect } from "react";

function ChatCard(user) {
  /*function typeOutUser() {
    for (let i = 0; i < 5; i++) {
      <UserCard interval={i} key={i} />;
    }
  }*/

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
