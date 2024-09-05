import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firbase'; 
import { removeUser } from '../utils/userSlice';
import { LOGO } from '../assets/constants';
const Header = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      dispatch(removeUser()); // Remove user from Redux state
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };




  return (
    <header className="flex justify-between items-center bg-gradient-to-b from-gray-800 to-gray-900 px-6 py-4 shadow-md h-16">
      <div className="w-32 flex items-center">
        <img
          src={LOGO}
          alt="Logo"
          className="w-full h-auto"
        />
      </div>
      {user && (
        <button
          onClick={handleLogout}
          className="text-white bg-red-600 hover:bg-red-700 font-semibold px-4 py-2 rounded-lg shadow-lg transition-colors duration-300"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
