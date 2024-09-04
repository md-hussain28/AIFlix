import React from 'react'
import { useState } from 'react';
import Validate from '../../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firbase'
import { useNavigate } from 'react-router-dom';

const Label = ({ val, forH, name }) => {
  //console.log(val,forH,name);

  return (
    <label
      htmlFor={forH}
      className="absolute top-3 left-3 text-gray-500 transition-all duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-700 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-red-600"
    >
      {val === "" ? name : ""}
    </label>
  )
}

const signUp = async (email, password, setErr) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user) {
      setErr("You are registered");
      console.log(user);
      return user; // Return the user object
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErr(`Error: ${errorCode}`);
    console.error("Sign-up error:", errorMessage);
    return null; // Return null or handle as needed
  }
};


const signIn = (email, password, setErr) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      setErr("You are logged in")

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErr("Error:" + errorMessage)

    });
}





const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [type, setType] = useState(true)
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  console.log("rendered");
  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = Validate(email, password);
    if (msg) {
      setErr(msg);
      setEmail("");
      setName("");
      setPassword("");
      setPassword2("");
      return;
    }

    if (type) {
      const user=signIn(email, password, setErr);

      navigate("/browse")
      console.log("Signed IN navigated :", user);

    } else {
      if (password != password2) {
        setErr("Passwords did not match"); return;
      }
      const done = signUp(email, password, setErr)
      if (done) { navigate("/"); setType(true) }

    }
    setEmail("");
    setName("");
    setPassword("");
    setPassword2("");

  }

  return (
    <div className="relative  flex items-center justify-center">

      <div className="relative z-10 p-6 sm:p-8  bg-opacity-95 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md mx-4 sm:mx-6 transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700 mb-6 sm:mb-8 text-center animate__animated animate__fadeIn animate__delay-1s">
          {type ? "Sign In to AiFlix" : "Sign Up to AiFlix"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 mx-2 sm:mx-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full p-3 sm:p-4 border-2 border-transparent rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
              placeholder="Name"
            />

            <Label val={name} forH="name" name="Name" />
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full p-3 sm:p-4 border-2 border-transparent rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
              placeholder="Email"
            />
            <Label val={email} forH="email" name="Email" />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full p-3 sm:p-4 border-2 border-transparent rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
              placeholder="Password"
            />

            <Label val={password} forH="password" name="Password" />
          </div>

          {!type && (
            <div className="relative">
              <input
                type="password"
                name="password2"
                id="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="peer w-full p-3 sm:p-4 border-2 border-transparent rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
                placeholder="Confirm Password"
              />

              <Label val={password2} forH="password2" name="Confirm Password" />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50"
          >
            {type ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className='text-sm font-bold text-red-700 text-center'>{err}</p>
        <div className="text-center mt-4 text-gray-500">
          <p>{type ? "Don't Have an Account?" : "Already Registered?"}</p>
          <button
            onClick={() => setType((p) => !p)}
            className="text-red-600 hover:text-red-700 transition-colors duration-300 font-semibold"
          >
            {type ? "Sign-Up" : "Sign-In"}
          </button>
        </div>
      </div>
    </div>

  )
}

export default Form
