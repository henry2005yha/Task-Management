import React from 'react'
import { useState } from 'react'

import './login.css';
import axiosInstance from '../../Components/AxiosHelper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axiosInstance.post('/user/login', { email, password });
<<<<<<< HEAD
      
=======
>>>>>>> 4169e60fcff382e51dd986cae94c52d4cb0d8223
      localStorage.setItem('email', response.data.email);
      console.log('Login successful');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login Error! Try Again', error);

    }
  };
  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required className='login-input' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required className='login-input' />
        <button type='submit' className='login-button'>Login</button>
      </form>
    </div>
  )
}

export default Login
