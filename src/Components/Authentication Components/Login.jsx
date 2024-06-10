import React, { useState } from 'react';
import './login.css';
import axiosInstance from '../AxiosHelper';
import swal from 'sweetalert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/user/login', { email, password });

      if (response.data.success) { // Assuming your backend sends a success field on successful login
        localStorage.setItem('email', response.data.email);
        console.log('Login successful');
        swal("Success!", "Login successful", "success")
          .then(() => {
            window.location.href = '/dashboard'; // Redirect to dashboard
          });
      } else {
        swal("Error!", "Login failed. Please check your email and password.", "error");
      }
    } catch (error) {
      console.error('Login Error! Try Again', error);
      swal("Error!", "Login failed. Please check your email and password.", "error");
    }
  };

  const handleRegisterClick = () => {
    window.location.href = '/register'; // Redirect to registration page
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required className='login-input' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required className='login-input' />
        <p onClick={handleRegisterClick} className='register-link'>Register Now</p>
        <button type='submit' className='login-button'>Login</button>
      </form>
    </div>
  );
};

export default Login;
