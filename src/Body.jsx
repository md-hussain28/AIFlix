import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Browse from './pages/browse/Browse'
import Notfound from './pages/Notfound'


const Body = () => {
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
