import axios from 'axios';
import React, { useState } from 'react'
import './register.css'

const Register = () => {
    
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/taskmanagement/user/register', {userName, email, password});
            console.log(response.data);
        } catch (error) {
            console.error('Registartion Error, Try Agsin!', error);
        }
    }
  return (
    <div className='register-container'>
      <form onSubmit={handleSubmit} className='register-form'>
      <h2>Register</h2>
        <input type="text" value={userName} onChange={(e) =>setUsername(e.target.value)} placeholder='Enter Username' required className="register-input"/>
        <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder='Enter Email' required className="register-input"/>
        <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='Enter Password' required className="register-input"/>
        <button type='submit' className="register-button">Register</button>
      </form>
    </div>
  )
}

export default Register
