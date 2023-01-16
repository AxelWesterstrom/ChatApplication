import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "../public/css/App.css";
import { useStates } from "./assets/states.js";
import Register from "./pages/Register.jsx";

let user = useStates("user", {
  userName: "",
  password: "",
  role: "",
});

let log = useStates("login", {
  login: false,
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
