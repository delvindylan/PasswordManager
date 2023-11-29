import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { set, ref, push } from "firebase/database";
import sha256 from "crypto-js/sha256";
import {getPasswordByUserID} from "../repo/repo";
import { database } from '../firebase';
import bcrypt from 'bcryptjs';
import { AddPasswordsButton } from "../components/AddPasswordsButton";






export function Passwords() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebiste] = useState("");
  const [passswords, setPasswords] = useState([])
  const navigate = useNavigate()
  function bcrypting (Input) {
    return bcrypt.hashSync(Input, 8);
  } 
 useEffect(() => {
    const fetchPasswords = async () => {
      const passwordsFetched = await getPasswordByUserID(sessionStorage.getItem("userID"));
      setPasswords(passwordsFetched)
      console.log(passwordsFetched)
    };
 
    fetchPasswords();
  }, []);



  function consolelog(){
    console.log(passwords)
  }
  return (
<>
      
<button type="button" onClick={consolelog}>wasd</button>
    <AddPasswordsButton/>

    </>  
  );
}
