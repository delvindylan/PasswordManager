import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { set, ref, push } from "firebase/database";
import sha256 from "crypto-js/sha256";
import {getUserByName} from "../repo/repo";
import { database } from '../firebase';
import bcrypt from 'bcryptjs';



export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function bcrypting (Input) {
    return bcrypt.hashSync(Input, 8);
  } 

  async function handleSignUp() {
    if (!username || !password) {
      console.log("Username and password are required.");
      return;
    }

    try {
      const user = await getUserByName(username);

      if (user) {
      } else {
        const usersRef = ref(database, "users");
        const newUserRef = push(usersRef);
        
        const hashedPassword = bcrypting(password);
        const userID = newUserRef.key;
        const userData = {
          username: username,
          hashedPassword: hashedPassword,
          userID: userID,
          
        };
        console.log("Sign Up successful");
        sessionStorage.setItem("userID", userID);
        const encryptionKey = password.trim() + "" + userID
        sessionStorage.setItem('key', sha256(encryptionKey).toString())
        set(newUserRef, userData);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="50vw"
      mx="auto"
    >
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          mb={4}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={4}
        />
        <Button colorScheme="teal" onClick={handleSignUp}>
          Sign Up
        </Button>
      </FormControl>
    </Box>
  );
}
