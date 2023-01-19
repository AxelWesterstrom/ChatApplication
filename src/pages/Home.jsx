import { useStates } from "../assets/states.js";

function Home() {
  const u = useStates("user");

  async function logout() {
    let result = await (await fetch("/api/login", { method: "DELETE" })).json();
    u.username = "";
    u.password = "";
  }

  return (
    <div style={{ color: "#fff" }} className="App">
      Hej! Detta får man bara se om man är inloggad!
      <button onClick={logout}>Logga ut</button>
    </div>
  );
}

export default Home;
