import axios from 'axios';
import React, { useState } from 'react'

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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userName} onChange={(e) =>setUsername(e.target.value)} placeholder='Enter Username' required/>
        <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder='Enter Email' required/>
        <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='Enter Password' required/>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
