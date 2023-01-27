import { Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import React from "react";
import "../css/chatCard.css";
import { useStates } from "../assets/states";

function ChatCard(user) {
  const [show, setShow] = React.useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  let myRooms = useStates("myChatRooms");

  const MyListGroup = () => (
    <ListGroup>
      {myRooms.rooms.map((room) => (
        <ListGroupItem key={room.roomId} onClick={() => inviteUser(room)}>
          {room.chatRoomName}
        </ListGroupItem>
      ))}
    </ListGroup>
  );

  async function getUserInfo() {
    let userToInvite = await (
      await fetch(`/api/users?username=${user.username}`)
    ).json();
    return userToInvite;
  }

  async function inviteUser(room) {
    let toInvite = await getUserInfo();
    console.log(room);
    await (
      await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room.roomId,
          userId: toInvite[0].id,
          owner: 0,
          pending: 1,
        }),
      })
    ).json();
  }

  return (ChatCard = (
    <>
      <ListGroup>
        <ListGroupItem onClick={handleOpen}> {user.username}</ListGroupItem>
      </ListGroup>
      <Modal show={show} onClose={handleClose}>
        <Modal.Header>Invite to room</Modal.Header>
        <Modal.Body>
          <ListGroup>{MyListGroup()}</ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  ));
}

export default ChatCard;
//  {" "}
//             {myRooms.rooms.map((room) => (
//               <ModalListItem key={room.roomId} user={user.username} {...room} />
//             ))}
