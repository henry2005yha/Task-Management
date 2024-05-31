import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Components/Authentication Components/Login';
import Register from './Components/Authentication Components/Register';
import TaskForm from './Components/Task Managment Components/TaskForm';
import TaskLists from './Components/Task Managment Components/TaskLists';
import DashBoard from './Components/DashBoard Components/DashBoard';

const Navigation = () => {
  const email = localStorage.getItem('email');
  return (
    email && (
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/task-form">Task Form</Link></li>
          <li><Link to="/task-lists">Task Lists</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    )
  );
};

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const email = localStorage.getItem('email');
  return email ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className='App'>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task-form" element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          } />
          <Route path="/task-lists" element={
            <PrivateRoute>
              <TaskLists />
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          } />
          <Route path="/" element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          } /> {/* Default route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
