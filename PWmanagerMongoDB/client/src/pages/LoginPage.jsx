import React from 'react'
import { auth, provider } from "../firebase";
import { signInWithPopup } from 'firebase/auth'


function LoginPage() {
  const signInUser = () => {
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  }
  return (
    <div className='text-center mt-72'>
        <h1 className='text-9xl font-bold '>ALZHEIMER MANAGER</h1>
      <div className='h-8'></div>
        <button onClick={signInUser} className='bg-blue-500 text-sm font-bold text-white rounded-lg hover:scale-110 transition-all duration-200 ease-in-out p-3 mt-5'>Sign in with Google</button>
    </div>
  )
}

export default LoginPage