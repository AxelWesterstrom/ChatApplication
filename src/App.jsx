import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

import { useStates } from "./assets/states.js";
import Register from "./pages/Register.jsx";
import "../public/css/commonStyles.css";

function App() {
  let user = useStates("user", {
    userName: "",
    password: "",
    role: "",
  });

  let log = useStates("login", {
    login: false,
  });

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
