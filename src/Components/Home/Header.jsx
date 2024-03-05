import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../..'
import { FaBars, FaTimes } from "react-icons/fa";
import './Header.css'

const Header = () => {
  const navRef = useRef(null);
  const {user} = useContext(Context);
  const showNavbar =()=>{
    if (navRef.current) {
      navRef.current.classList.toggle('responsiveNav');
    }
  }   
  
  if(user == null){
    return(
      <div className='header'>
      <nav className=' h-[9vh] max-w-screen bg-purple-400 font-serif w-screen flex items-center justify-between shadow-lg shadow-gray'>
          <h2 className='ml-8 font-sans font-semibold text-3xl'>Assignment</h2>
          <div className='flex justify-end' ref={navRef}>
              <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold' to="/">Home</Link>
              <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold' to="/imageList">Images</Link>
              <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold' to="/login">Login</Link>
              <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold' to="/signup">signUp</Link>
              <button className='navBtn navCloseBtn ' onClick={showNavbar}>
      <FaTimes/>
      </button> 
          </div>
          <button className='navBtn openBtn mx-12 text-xl ' onClick={showNavbar}>
      <FaBars/>
    </button>
      </nav>
      </div>
    )
  }
  return (
    <div className='header'>
    <nav className=' h-[9vh] max-w-screen bg-purple-400 font-serif w-screen flex items-center justify-between shadow-lg shadow-gray'>
        <h2 className='ml-8 font-sans font-semibold text-3xl'>Assignment</h2>
        <div className='flex justify-end' ref={navRef}>
            <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold' to="/">Home</Link>
            <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold' to="/imageList">Images</Link>
            <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold' to="/logout">Logout</Link>
            <button className='navBtn navCloseBtn ' onClick={showNavbar}>
      <FaTimes/>
      </button> 
        </div>
        <button className='navBtn openBtn mx-12 text-xl ' onClick={showNavbar}>
      <FaBars/>
    </button>
    </nav>
  
    </div>
  )
}

export default Header