import React, { useState } from 'react';
import axiosInstance from '../AxiosHelper';
import { useNavigate } from 'react-router-dom';
import './taskItem.css'; // Ensure you have the appropriate styles

const TaskItems = ({ task, onUpdate }) => {
  const [taskStatus, setTaskStatus] = useState(task.status);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/task/delete?taskId=${task.taskId}`);
      onUpdate(); // Notify the parent component to update the state
    } catch (error) {
      console.error('Error in Deleting Tasks', error);
    }
  };

  const handleComplete = async () => {
    try {
      await axiosInstance.put(`/task/complete?taskId=${task.taskId}`, { ...task, status: 'complete' });
      setTaskStatus('complete');
      onUpdate(); // Notify the parent component to update the state
    } catch (error) {
      console.error('Error in updating Tasks', error);
    }
  };

  const handleEdit = () => {
    navigate(`/task-form/${task.taskId}`);
  };

  return (
    <div className='item'>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {taskStatus}</p>
      <button onClick={handleComplete} disabled={taskStatus === 'complete'}>
        {taskStatus === 'complete' ? 'Completed' : 'Mark as Complete'}
      </button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItems;
