import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';  
import { auth } from "./firebase";
import PassManager from "./pages/PassManger";
import LoginPage from "./pages/LoginPage";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return (
    <ChakraProvider> {}
      <div>
        {!user ? <LoginPage /> : <PassManager />}
      </div>
    </ChakraProvider>
  );
}

export default App;
