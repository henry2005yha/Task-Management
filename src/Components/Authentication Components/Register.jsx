import React, { useState } from 'react';
import './register.css';
import axiosInstance from '../AxiosHelper';
import swal from 'sweetalert';

const Register = () => {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            // Show error message for minimum password length
            swal("Error!", "Password must be at least 8 characters long.", "error");
            return;
        }
        try {
          const response = await axiosInstance.post('/user/register', { username, email, password });
          localStorage.setItem('email', response.data.email);
          // Show congrats message for successful registration
          swal("Success!", "You have successfully registered.", "success")
            .then(() => {
                window.location.href = '/dashboard';
            });
        } catch (error) {
            console.error('Registration Error, Try Again!', error);
            // Show error message for unsuccessful registration
            swal("Error!", "Registration failed. Please try again.", "error");
        }
    }
    
    const handleLoginClick = () => {
      window.location.href = '/login'; // Redirect to login page
    };

    return (
        <div className='register-container'>
            <form onSubmit={handleSubmit} className='register-form'>
                <h2>Register</h2>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username' required className="register-input" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' required className="register-input" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' required className="register-input" />
                <p onClick={handleLoginClick} className='register-link'>Login</p>
                <button type='submit' className="register-button">Register</button>
            </form>
        </div>
    );
}

export default Register;
