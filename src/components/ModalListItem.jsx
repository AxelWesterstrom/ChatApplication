import { ListGroup, ListGroupItem } from "react-bootstrap";
import "../css/chatCard.css";

function ModalListItem(props) {
  let toInvite;

  async function getUserInfo() {
    let user = await (await fetch(`/api/users?username=${props.user}`)).json();
    toInvite = user[0];
  }
  function inviteUser() {
    getUserInfo();
  }

  console.log(props);
  console.log(toInvite);
  return (ModalListItem = (
    <>
      <ListGroup>
        <ListGroupItem onClick={inviteUser}>{props.chatRoomName}</ListGroupItem>
      </ListGroup>
    </>
  ));
}

export default ModalListItem;
