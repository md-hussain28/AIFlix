import React, { useEffect } from 'react'
import { BrowserRouter,Route,Routes, useNavigate } from 'react-router-dom'
import Login from './pages/login/Login'
import Browse from './pages/browse/Browse'
import Notfound from './pages/Notfound'
import {auth} from './utils/firbase.js'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import {addUser,removeUser} from './utils/userSlice'

const Body = () => {
   const dispatch=useDispatch();
 
   useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayname} = user;
        dispatch(addUser({uid:uid,email:email,displayname:displayname}));
        
      } else {
        // User is signed out
        dispatch(removeUser());
   
      }
    });
   },[])

  return (
   <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/browse" element={<Browse/>}/>
        <Route path="*" element={<Notfound/>}/>
     </Routes>
   </BrowserRouter>
  )
}

export default Body
