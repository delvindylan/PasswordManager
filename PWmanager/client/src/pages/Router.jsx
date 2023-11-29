import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Passwords } from "./Passwords";
import { ChakraProvider } from "@chakra-ui/react";
import { Register } from "./Register";

export function Router() {
    

    return (
    <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/register" element={<Register />} />
                    <Route path="/passwords" element={<Passwords />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes >
            </BrowserRouter >
    </ChakraProvider>
    )
}