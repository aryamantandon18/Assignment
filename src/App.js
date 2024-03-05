import './App.css';
import { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Home/Header';
import Login from './Components/Login/Login';
import { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, fireStore } from './Context/Firebase';
// import { doc, getDoc } from 'firebase/firestore';
import SignUp from './Components/SignUp/SingUp';
import Logout from './Components/Login/Logout';
import { Context } from '.';
import ImageList from './Components/imageList/ImageList';
import Footer from './Components/Home/Footer';


function App() {
const {user,setUser} = useContext(Context);

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        setUser(user);
        // const snapShot = await getDoc(doc(fireStore,"users",user.uid));
        // console.log("User detials are here ->");
        // console.log(snapShot.data());
      }
      else{
        setUser(null);
        console.log("No user is there ");
      }
    })
  },[])
  return (
   <Fragment>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        {console.log('This is in app.js' , user)}
        <Route path='/imageList' element={<ImageList User={user}/>}/>
      </Routes>
      <Footer/>
      <Toaster/>
    </Router>
   </Fragment>
  );
}

export default App;

//projectName - intern
//  <div className="App">
{/* <h1>Welcome to Firebase</h1>
<button onClick={putData}>Put Data</button>
<h1>Hello, Bootstrap!</h1>
  <button className="btn btn-primary">Click me</button>
</div> */}
