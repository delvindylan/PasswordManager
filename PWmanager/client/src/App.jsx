import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");

  const addPassword = () => {
  Axios.post("http://localhost:3003/addpassword", {
    password: password,
    title: title
  })
  }
  return (
    <div className="App">
      <div className="addPassword">
        <input type="text" placeholder="Bsp. PASSWORT" onChange={(event) => {setPassword(event.target.value)}} />
        <input type="text" placeholder="Bsp. Instagram" onChange={(event) => {setTitle(event.target.value)}} />
        <button onClick={addPassword}>Passwort hinzufügen</button>
      </div>
    </div>
  );
}

export default App;
