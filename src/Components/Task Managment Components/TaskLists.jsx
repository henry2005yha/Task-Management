import React, { useEffect, useState } from 'react'
import TaskItems from './TaskItems';
import axiosInstance from '../AxiosHelper';

const TaskLists = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await axiosInstance.get('/task/get');
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks', error);
        }
      };
      fetchTasks();
    }, []);

  return (
    <div>
      <h2>Task Lists</h2>
      <ul>
        {tasks.map(task => (
            <TaskItems key={task.id} task={task}/>
        )

        )}
      </ul>
    </div>
  )
}

export default TaskLists
