import React, { useContext } from 'react'
import { auth } from '../../Context/Firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';

const Logout = () => {
    const {setUser} = useContext(Context);
    const navigate = useNavigate();
    const logoutHandler = async() =>{
        await signOut(auth);
        toast.success("LoggedOut Successfully");
        setUser(null);
        navigate('/');
    }
  return (
    <div className='App'>
           <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={logoutHandler}>
          Logout
      </button>
    </div>
  )
}

export default Logout