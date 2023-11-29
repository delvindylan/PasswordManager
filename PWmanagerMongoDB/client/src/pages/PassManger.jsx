import "../App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Header from "../components/Header";

function PassManger() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    Axios.get("http://localhost:3003/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  const addPassword = () => {
    try {
      Axios.post("http://localhost:3003/addpassword", {
        password: password,
        title: title,
      });  
    } catch (error) {
      console.log(error);
    }
    
  };

  const decryptPassword = (encryption) => {
    const data = {
      password: encryption.password,
      iv: encryption.iv,
    };
  
    Axios.post("http://localhost:3003/decryptpassword", data).then((response) => {
      setPasswordList((prevPasswordList) => {
        const updatedPasswordList = [...prevPasswordList];
        const index = updatedPasswordList.findIndex((val) => val.id === encryption.id);
  
        if (index !== -1) {
          updatedPasswordList[index] = {
            ...updatedPasswordList[index],
            title: response.data,
          };
        }
  
        return updatedPasswordList;
      });
    });
  };
  

return (
    <div className="App">
      <Header/>
      <div className="addPassword">
        <input
          type="text"
          placeholder="Bsp. PASSWORT"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Bsp. Instagram"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <button onClick={addPassword}>Passwort hinzufügen</button>
      </div>

      <div className="Passwords">
        {passwordList.map((val, key) => {
          return (
            <div
              className="password"
              onClick={() => {
                decryptPassword({
                  password: val.password,
                  iv: val.iv,
                  id: val.id,
                });
              }}
              key={key}
            >
              <h3>{val.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PassManger