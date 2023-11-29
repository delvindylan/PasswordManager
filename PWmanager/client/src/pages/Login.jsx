import React, { useState } from "react";
import  {useNavigate} from "react-router-dom";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import  {getUserByName} from "../repo/repo";
import sha256 from 'crypto-js/sha256';
import bcrypt from 'bcryptjs';

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
    
  async function handleLogin(){
    
    if (!username || !password) return;

    const user = await getUserByName(username)
    if (user) {
        console.log("user exists")
        
        if (bcrypt.compareSync(password, user.hashedPassword)) {
            sessionStorage.setItem('userID', user.userID);
            sessionStorage.setItem('username', user.username);
            const encryptionKey = password.trim() + "" + user.userID
            sessionStorage.setItem('key', sha256(encryptionKey).toString())
            console.log(sessionStorage.getItem("userID"))
            navigate("/passwords")
        } else console.log("wrong password")
    }

};



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
          <Button colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
        </FormControl>
      </Box>
  );
}
