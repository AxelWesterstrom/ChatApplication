import { ListGroup, ListGroupItem } from "react-bootstrap";
import "../css/chatCard.css";

function ChatRoomCard(room) {
  function inviteUser() {
    alert("Inviting the user" + JSON.stringify(room, "", "  "));
  }

  return (ChatRoomCard = (
    <>
    <ListGroup>
      <ListGroupItem onClick={() => inviteUser(room)}>
        {" "}
        {room.chatRoomName}
      </ListGroupItem>
      </ListGroup>
    </>
  ));
}

export default ChatRoomCard;
