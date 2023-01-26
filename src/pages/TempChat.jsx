// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import LoginForm from "./components/LoginForm";

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");

//   const startSSE = () => {
//     let sse = new EventSource("/api/sse");

//     sse.addEventListener("connect", (message) => {
//       let data = JSON.parse(message.data);
//       console.log("[connect]", data);
//     });

//     sse.addEventListener("disconnect", (message) => {
//       let data = JSON.parse(message.data);
//       console.log("[disconnect]", data);
//     });

//     sse.addEventListener("new-message", (message) => {
//       let data = JSON.parse(message.data);
//       console.log("[new-message]", data);
//       // add to messages array
//       setMessages([...messages, data]);
//     });
//   };

//   useEffect(() => {
//     startSSE();
//   }, []);

//   function sendMessage(e) {
//     e.preventDefault();
//     fetch("/api/message", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text: messageInput }),
//     });
//     setMessageInput("");
//   }

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </BrowserRouter>
//       {/* <div className="messages">
//         {messages.map((x, i) => (
//           <div key={i} className="message">
//             <p>time: {new Date(x.timestamp).toLocaleString()}</p>
//             <p>msg: {x.text}</p>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={sendMessage}>
//         <input
//           type="text"
//           value={messageInput}
//           onChange={(e) => setMessageInput(e.target.value)}
//         />
//         <input type="submit" value="Send" />
//       </form> */}
//     </div>
//   );
// }

// export default App;
