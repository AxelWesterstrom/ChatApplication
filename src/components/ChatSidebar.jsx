import React from "react";
import { Accordion, Container } from "react-bootstrap";
import "../css/chatSidebar.css";
import ChatCard from "./ChatCard";

function ChatSidebar() {
  return (ChatSidebar = (
    <>
      <Container className="justify-content-sm-start">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Online</Accordion.Header>
            <Accordion.Body>
              <ChatCard></ChatCard>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Chat rooms</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  ));
}

export default ChatSidebar;
