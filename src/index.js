import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createContext } from 'react';

export const Context = createContext();
const AppWrapper=()=>{
  const[isAuthenticated,setIsAuthenticated] = useState(false)
  const[Loading,setLoading] = useState(false);
  const[user,setUser]=useState({});
  const[imageUrls,setImageUrls] = useState([]);
  return(
    <Context.Provider value={{ isAuthenticated,setIsAuthenticated,Loading,setLoading,user,setUser,imageUrls,setImageUrls}}>
    <App />
    </Context.Provider>
  );
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

