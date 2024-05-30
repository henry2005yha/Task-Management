import logo from './logo.svg';
import './App.css';
import Login from './Components/Authentication Components/Login';
import Register from './Components/Authentication Components/Register';
import TaskForm from './Components/Task Managment Components/TaskForm';
import TaskLists from './Components/Task Managment Components/TaskLists';
import DashBoard from './Components/DashBoard Components/DashBoard';

function App() {
  return (
    <div className="App">
     {/* <Login/>
     <Register/> */}
     {/* <TaskForm/> */}
    <DashBoard/>
     
    </div>
  );
}

export default App;
