import React from 'react'

import { auth } from "./firebase";
import PassManager from "./pages/PassManger";
import LoginPage from "./pages/LoginPage";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div>
      {!user ? <LoginPage /> : <PassManager />}
    </div>
  );
}

export default App;
