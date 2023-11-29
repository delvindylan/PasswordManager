const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3003;

const { encrypt, decrypt } = require("./EncryptionHandler");

app.use(cors());
app.use(express.json());

// MongoDB-Verbindung
mongoose.connect("mongodb://localhost:27017/PasswordManager", {
});

// MongoDB-Schema
const passwordSchema = new mongoose.Schema({
  password: String,
  title: String,
  iv: String,
});

// MongoDB-Modell
const Password = mongoose.model("Password", passwordSchema);

// Routen für MongoDB
app.post("/addpassword", async (req, res) => {
  const { password, title } = req.body;
  const hashedPassword = encrypt(password);

  try {
    // Neues Dokument erstellen und in die Datenbank einfügen
    const newPassword = new Password({
      password: hashedPassword.password,
      title: title,
      iv: hashedPassword.iv,
    });
    await newPassword.save();
    res.send("Success");
  } catch (err) {
    console.error("Error", err);
    res.status(500).send("Error");
  }
});

app.get("/showpasswords", async (req, res) => {
  try {
    // Alle Dokumente aus der Datenbank abrufen
    const passwords = await Password.find();
    res.send(passwords);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.post("/decryptpassword", (req, res) => {
  // Entschlüsselungsfunktion aufrufen
  

  try {
    console.log(req.body);
    const decryptedPassword = decrypt(req.body);
    console.log(decryptedPassword);
    res.send(decryptedPassword);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error:");
  }
  
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running");
});
