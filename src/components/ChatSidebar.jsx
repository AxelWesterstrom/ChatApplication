import React from "react";
import {
  Accordion,
  Container,
  Button,
  Modal,
  Form,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import "../css/chatSidebar.css";
import ChatCard from "./ChatCard";
import ChatRoomCard from "./ChatRoomCard";
import { useEffect } from "react";
import { useStates } from "../assets/states";

function ChatSidebar() {
  let online = useStates("online");
  let chatRooms = useStates("chatRooms");
  let chatRoom = useStates("chatRoom");
  let u = useStates("user");

  const [show, setShow] = React.useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (u.id === "") {
      getUserInfo();
    }
    console.log(u);
    getLoggedInUsers();
    getChatRooms();
  }, []);

  async function getUserInfo() {
    let currentUser = await (
      await fetch(`/api/users?username=${u.username}`)
    ).json();
    Object.assign(u, currentUser[0]);
  }

  async function getLoggedInUsers() {
    online.users = await (await fetch(`/api/online-users`)).json();
  }

  async function getChatRooms() {
    chatRooms.rooms = await (await fetch(`/api/my-chatrooms`)).json();
  }

  async function createRoom(event) {
    event.preventDefault();
    let createdRoom = await (
      await fetch("/api/chatRooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: chatRoom.name,
        }),
      })
    ).json();

    await (
      await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: createdRoom.lastInsertRowid,
          userId: u.id,
          owner: 1,
          pending: 0,
        }),
      })
    ).json();
    window.location.reload(false);
  }

  return (ChatSidebar = (
    <>
      <Container className="justify-content-sm-start">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Online</Accordion.Header>
            <Accordion.Body>
              {online.users.map((user) => (
                <ChatCard key={user.id} {...user} />
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Chat rooms</Accordion.Header>
            <Accordion.Body>
              <Button onClick={handleOpen}>Create a new chat room</Button>
              <Modal show={show} onClose={handleClose}>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                  <Form onSubmit={createRoom} autoComplete="off">
                    <FormLabel style={{ color: "#000" }}>Room name</FormLabel>
                    <FormControl type="text" {...chatRoom.bind("name")} />
                    <Button type="submit" style={{ marginTop: 20 }}>
                      Create room
                    </Button>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>
              <hr></hr>
              {chatRooms.rooms.map((room) => (
                <ChatRoomCard key={room.roomId} {...room} />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  ));
}

export default ChatSidebar;
