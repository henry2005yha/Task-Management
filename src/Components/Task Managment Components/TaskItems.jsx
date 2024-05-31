import axiosInstance from '../AxiosHelper';
import React, { useState } from 'react';

const TaskItems = ({ task }) => {
  const [taskStatus, setTaskStatus] = useState(task.status);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/task/delete?taskId=${task.taskId}`);
    } catch (error) {
      console.error('Error in Deleting Tasks', error);
    }
  };

  const handleComplete = async () => {
    try {
      await axiosInstance.put(`/task/complete?taskId=${task.taskId}`, { ...task, status: 'complete' });
      setTaskStatus('complete');
    } catch (error) {
      console.error('Error in updating Tasks', error);
    }
  };

  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {taskStatus}</p>
      <p>Category: {task.category}</p>
      <button onClick={handleComplete} disabled={taskStatus === 'complete'}>
        {taskStatus === 'complete' ? 'Completed' : 'Mark as Complete'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TaskItems;
