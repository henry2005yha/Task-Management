import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navigation = () => {
  const isLoggedIn = Boolean(localStorage.getItem('email'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login');
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/task-form">Task Form</Link></li>
        <li onClick={handleLogout}><Link>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
