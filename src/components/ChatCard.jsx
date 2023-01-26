import { Col, Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import React from "react";
import "../css/chatCard.css";
import { useStates } from "../assets/states";
import ModalListItem from "./ModalListItem";

function ChatCard(user) {
  const [show, setShow] = React.useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  let myRooms = useStates("myChatRooms");

  return (ChatCard = (
    <>
      <ListGroup>
        <ListGroupItem onClick={handleOpen}> {user.username}</ListGroupItem>
      </ListGroup>
      <Modal show={show} onClose={handleClose}>
        <Modal.Header>Invite to room</Modal.Header>
        <Modal.Body>
          <ListGroup>
            {" "}
            {myRooms.rooms.map((room) => (
              <ModalListItem key={room.roomId} user={user.username} {...room} />
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  ));
}

export default ChatCard;
