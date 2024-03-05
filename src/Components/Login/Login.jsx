import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword,signInWithPopup } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { Context } from '../..';

const Login = () => {
  const {user,setUser,Loading,setLoading,isAuthenticated,setIsAuthenticated} = useContext(Context);

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const loginWithGoogle=()=>{
      signInWithPopup(auth,googleProvider)
      .then(value => {
        toast.success("LoggedIn successfully")
        // setUser(value.user);
      })
      .catch(error => alert("This error is comming - ",error))
    }

    const LoginUser = () =>{
        signInWithEmailAndPassword(auth,email,password)
        .then(value => {
          toast.success("LoggedIn successfully");
          console.log("value is" + value);
        })
        .catch(error => alert("There is some error - ",error));
        };
    
  return (
    <div className='w-[100%] h-[91vh] flex items-center justify-center border border-black'>
    <div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required autoComplete='off'/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e)=>{setPassword(e.target.value)}} required/>
      <p class="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={LoginUser}>
        Log In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={loginWithGoogle}>
        Login With Google
      </button>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div>
  </div>
  )
}

export default Login