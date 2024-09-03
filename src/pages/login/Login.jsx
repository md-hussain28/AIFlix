import React from 'react'
import Header from '../Header';
import Form from './Form'
const Login = () => {
  return (
    <div className='bg-gradient-to-br from-slate-950 min-h-screen flex-col justify-between'>
      <Header/>
      <div className="h-32"></div>
      <Form />
    </div>
  )
}

export default Login;
