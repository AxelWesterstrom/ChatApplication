import { Col } from "react-bootstrap";
import "../css/chatCard.css";

function ChatRoomCard(room) {
  function inviteUser() {
    alert("Inviting the user" + JSON.stringify(room, "", "  "));
  }

  return (ChatRoomCard = (
    <>
      <Col onClick={() => inviteUser(room)}> {room.chatRoomName}</Col>
      <hr />
    </>
  ));
}

export default ChatRoomCard;
