const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3003;

const { encrypt, decrypt } = require("./EncryptionHandler");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "PasswordManager",
});

app.post("/addpassword", (req, res) => {
  const { password, title } = req.body;
 
  db.query(
    "INSERT INTO passwords (password, title) VALUES (?,?)",
    [password, title],
    (err, result) => {
      if (err) {
        console.log("Error");
      } else {
        res.send("Success");
      }
    }
  );
});
/*
app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
}); 
*/

app.get ("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running");
});