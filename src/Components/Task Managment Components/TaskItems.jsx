import React, { useState } from 'react';
import axiosInstance from '../AxiosHelper';
import { useNavigate } from 'react-router-dom';
import './taskItem.css';
import swal from 'sweetalert';

const TaskItems = ({ task, onUpdate }) => {
  const [taskStatus, setTaskStatus] = useState(task.status);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/task/delete?taskId=${task.taskId}`);
      onUpdate(); // Notify the parent component to update the state
      swal("Success!", "You have successfully deleted a task.", "success");
    } catch (error) {
      console.error('Error in Deleting Tasks', error);
    }
  };

  const handleComplete = async () => {
    try {
      await axiosInstance.put(`/task/complete?taskId=${task.taskId}`, { ...task, status: 'complete' });
      setTaskStatus('complete');
      onUpdate(); // Notify the parent component to update the state
      swal("Congrats!", "You have successfully finished a task.", "success");
    } catch (error) {
      console.error('Error in updating Tasks', error);
    }
  };

  const handleEdit = () => {
    navigate(`/task-form/${task.taskId}`);
  };

  const ribbonColor = taskStatus === 'complete' ? '#00C49F' : '#FFBB28';

  return (
    <div className='item'>
    <div className="ribbon-g" style={{ backgroundColor: ribbonColor }}>
      <p>{taskStatus}</p>
    </div>
    <div className="content">
      <h3>{task.title}</h3>
      <span className="category">{task.category}</span>
      <hr />
      <p className="description">{task.description}</p>
      <div className="buttons">
        <button onClick={handleComplete} disabled={taskStatus === 'complete'}>
          {taskStatus === 'complete' ? 'Completed' : 'Mark as Complete'}
        </button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  </div>
  );
};

export default TaskItems;
