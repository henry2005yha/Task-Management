import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Components/Authentication Components/Login';
import Register from './Components/Authentication Components/Register';
import TaskForm from './Components/Task Managment Components/TaskForm';
import TaskLists from './Components/Task Managment Components/TaskLists';
import DashBoard from './Components/DashBoard Components/DashBoard';

const Navigation = () => {
  const isLoggedIn = Boolean(localStorage.getItem('email'));

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/task-form">Task Form</Link></li>
        <li><Link to="/task-lists">Task Lists</Link></li>
      </ul>
    </nav>
  );
};

function App() {
  const isLoggedIn = Boolean(localStorage.getItem('email'));

  return (
    <div className='App'>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task-form/:taskId" element={<TaskForm />} />
          <Route path="/task-form" element={<TaskForm />} />
          <Route path="/task-lists" element={<TaskLists />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
