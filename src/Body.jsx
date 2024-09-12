import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import Login from './pages/login/Login';
import Browse from './pages/browse/Browse';
import Notfound from './pages/Notfound';
import { auth } from './utils/firbase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from './utils/userSlice';
import Header from './pages/Header.jsx';
import Details from './pages/movie/Details.jsx';
import Footer from './pages/Footer.jsx';
import Search from './pages/search/Search.jsx';

const Body = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        setUser(user);

        // Only navigate to '/browse' if the user is not already on a valid page
        if (location.pathname === "/" || location.pathname === "/login") {
          navigate("/browse"); // Only redirect to /browse if they're on login/root page
        }
      } else {
        // User is signed out
        dispatch(removeUser());
        setUser(null);

        // Redirect to root if they're not already on root or login page
        if (location.pathname !== "/") {
          navigate("/"); // Redirect to login/root page
        }
      }
    });

    return () => unsubscribe();
  }, [location, navigate, dispatch]); // Add location as a dependency
  
  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/:movieId" element={<Details />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Body;
