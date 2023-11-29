// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoKvi0J1bBsmBqNUMtmlGDUTdnSOddudw",
  authDomain: "passwordmanager-9eb4b.firebaseapp.com",
  projectId: "passwordmanager-9eb4b",
  storageBucket: "passwordmanager-9eb4b.appspot.com",
  messagingSenderId: "834478938064",
  appId: "1:834478938064:web:b76a4a0fa8633b7d948bd5",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth, provider};