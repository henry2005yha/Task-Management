import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/taskmanagement/user/login', {email, password});
            console.log(response.data);
        } catch (error) {
            console.error('Login Error! Try Again', error);
        }
    };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
