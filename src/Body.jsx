import React, { useEffect, useState } from 'react'
import { BrowserRouter,Route,Routes, useNavigate } from 'react-router-dom'
import Login from './pages/login/Login'
import Browse from './pages/browse/Browse'
import Notfound from './pages/Notfound'
import {auth} from './utils/firbase.js'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import {addUser,removeUser} from './utils/userSlice'
import Header from './pages/Header.jsx'

const Body = () => {
   const dispatch=useDispatch();
   const [user,setUser]=useState(null);
   useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayname} = user;
        dispatch(addUser({uid:uid,email:email,displayname:displayname}));
        setUser(user);
      } else {
        // User is signed out
        dispatch(removeUser());
        setUser(null)
      }
    });
   },[])

  return (
   <BrowserRouter>
     <Header user={user}/>
     <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/browse" element={<Browse/>}/>
        <Route path="*" element={<Notfound/>}/>
     </Routes>
   </BrowserRouter>
  )
}

export default Body
