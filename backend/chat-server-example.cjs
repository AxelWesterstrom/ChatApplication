/*
  C - Create  - POST
  R - Read    - GET
  U - Update  - PUT
  D - Delete  - DELETE
*/

// Require express
// ( a module to help us build web servers )
const express = require("express");

// create a web server instance
const app = express();

// add body parser, to enable objects in req.body
app.use(express.json());

// req == request
// res == response

// register endpoint/route/route-handler
app.get("/hello", (req, res) => {
  res.send("Hello from Express");
});

// new message handler
app.post("/api/message", (req, res) => {
  let message = req.body;

  // set timestamp
  message.timestamp = Date.now();

  // message all open client with new message
  broadcast("new-message", message);

  res.send("ok");
});

// Server-Sent Events

// Store open connections in a list
let connections = [];

// Route for SSE
app.get("/api/sse", (req, res) => {
  // Add the response to open connections
  connections.push(res);

  // listen for client disconnection
  // and remove the client's response
  // from the open connections list
  req.on("close", () => {
    connections = connections.filter((openRes) => openRes != res);

    // message all open connections that a client disconnected
    broadcast("disconnect", {
      message: "client disconnected",
    });
  });

  // Set headers to mark that this is SSE
  // and that we don't close the connection
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  // message all connected clients that this
  // client connected
  broadcast("connect", {
    message: "clients connected: " + connections.length,
  });
});

// function to send message to all connected clients
function broadcast(event, data) {
  // loop through all open connections and send
  // some data without closing the connection (res.write)
  for (let res of connections) {
    // syntax for a SSE message: 'event: message \ndata: "the-message" \n\n'
    res.write("event:" + event + "\ndata:" + JSON.stringify(data) + "\n\n");
  }
}

// serve static files
app.use(express.static(__dirname + "/static"));

// start the web server
app.listen(4000, () => console.log("Listening on http://localhost:4000"));
