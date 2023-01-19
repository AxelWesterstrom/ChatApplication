import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import LoginForm from "./components/LoginForm.jsx";
import { useStates } from "./assets/states.js";
import Register from "./pages/Register.jsx";
import "./css/commonStyles.css";

function App() {
  let user = useStates("user", {
    username: "",
    password: "",
    role: "",
  });

  console.log(user, "user");
  let log = useStates("login", {
    login: false,
  });

  useEffect(() => {
    (async () => {
      let checkLogin = await (await fetch("/api/login")).json();
      if (!checkLogin._error) {
        user.username = checkLogin.username;
        user.password = checkLogin.password;
      }
    })();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user.username ? <Home /> : <LoginForm />} />
          <Route path="/create-account" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
