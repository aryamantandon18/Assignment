import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../Context/Firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const signupHandler = (e)=>{
      e.preventDefault();
       createUserWithEmailAndPassword(auth,email,password)
      .then(value => {
        toast.success("Sign Up Successfully");
        navigate('/login');
      })
      .catch(error => toast.error(error))
    }
    
  return (
    <div className='w-[100%] h-[91vh] flex items-center justify-center border border-black'>
      <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email"value={email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete='off'/>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} required onChange={(e)=>{setPassword(e.target.value)}} autoComplete='off'/>
        {password && 
        password.length<8 ? (<p class="text-red-500 text-xs italic">Please choose a password.</p>) :("") }
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={signupHandler}>
          Sign In
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div>
    </form>
  </div>
    </div>
  )
}

export default SignUp