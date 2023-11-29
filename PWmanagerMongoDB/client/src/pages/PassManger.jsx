import { useState, useEffect } from "react";
import Axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {
  Box,
  Input,
  Button,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import Header from "../components/Header";

function PassManager() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    Axios.get("http://localhost:3003/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  const addPassword = async () => {
    try {
      await Axios.post("http://localhost:3003/addpassword", {
        password: password,
        title: title,
      });
  
      const response = await Axios.get("http://localhost:3003/showpasswords");
      setPasswordList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const decryptPassword = (encryption) => {
    const data = {
      password: encryption.password,
      iv: encryption.iv,
    };

    Axios.post("http://localhost:3003/decryptpassword", data).then(
      (response) => {
        setPasswordList((prevPasswordList) => {
          const updatedPasswordList = [...prevPasswordList];
          const index = updatedPasswordList.findIndex(
            (val) => val.id === encryption.id
          );

          if (index !== -1) {
            updatedPasswordList[index] = {
              ...updatedPasswordList[index],
              title: response.data,
            };
          }

          return updatedPasswordList;
        });
      }
    );
  };

  return (
    <Box
      className="App"
      bgGradient="linear(to-t, teal.300, purple.800)"
      minHeight="100vh"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Header />
      <VStack spacing={8} align="center" mt={8}>
        <Box
          className="addPassword"
          p={8}
          borderRadius="lg"
          bg="rgba(255, 255, 255, 0.1)"
          boxShadow="lg"
          maxW="50vw"
          w="100%"
        >
          <Input
            type="text"
            placeholder="Enter Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            mb={4}
            variant="filled"
            color="white"
          />
          <Input
            type="text"
            placeholder="Enter Title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            mb={4}
            variant="filled"
            color="white"
          />
          <Button
            onClick={addPassword}
            colorScheme="pink"
            _hover={{ bg: "pink.600" }}
          >
            Add Password
          </Button>
        </Box>

        <VStack spacing={4} align="stretch" w="50vw">
          {passwordList.map((val, key) => {
            return (
              <Box
                className="password"
                onClick={() => {
                  decryptPassword({
                    password: val.password,
                    iv: val.iv,
                    id: val.id,
                  });
                }}
                key={key}
                p={6}
                borderRadius="lg"
                bg="rgba(255, 255, 255, 0.1)"
                boxShadow="md"
                cursor="pointer"
                _hover={{ boxShadow: "lg" }}
                w="100%"
              >
                <Heading as="h3" size="md">
                  {val.title}
                </Heading>
                <Text mt={2} fontSize="sm">
                  Click to Decrypt
                </Text>
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
}

export default PassManager;
