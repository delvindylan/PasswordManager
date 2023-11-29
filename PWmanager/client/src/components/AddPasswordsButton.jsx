import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { set, ref, push } from "firebase/database";
import sha256 from "crypto-js/sha256";
import {getPasswordByUserID} from "../repo/repo";
import { database } from '../firebase';
import bcrypt from 'bcryptjs';

export function AddPasswordsButton({ children, onClick, colorScheme, size }) {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [website, setWebsite] = useState("");

const userID = sessionStorage.getItem("userID")
 async function createNewPassword() {

  try {
    if (userID) {
    const passwordRef = ref(database, "passwords");
    const newPasswordRef = push(passwordRef);
    
    const passwordID = newPasswordRef.key;
    const userPassword = {
      email: email,
      password: password,
      website: website,
      userID: userID,
      passowordID: passwordID,
      
    };
    console.log("Password successfuly created");
    set(newPasswordRef, userPassword);
    } else {

    }
  } catch (error) {
    console.error("Error pushing data:", error);
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
       <FormLabel>Email</FormLabel>
       <Input
         type="text"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         mb={4}
       />
       <FormLabel>Password</FormLabel>
       <Input
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         mb={4}
       />
       <FormLabel>Website</FormLabel>
       <Input
         type="text"
         value={website}
         onChange={(e) => setWebsite(e.target.value)}
         mb={4}
       />
       <Button colorScheme="teal" onClick={createNewPassword}>
         Sign Up
       </Button>
     </FormControl>
   </Box>
 );
};

export default AddPasswordsButton;