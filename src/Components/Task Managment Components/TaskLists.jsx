import React, { useEffect, useState } from 'react';
import TaskItems from './TaskItems';
import axiosInstance from '../AxiosHelper';

const TaskLists = () => {
    const [tasks, setTasks] = useState([]); // Ensure initial state is an empty array

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get('/task/get');
                console.log(response.data); // Log response data to check its structure
                setTasks(Array.isArray(response.data.tasks) ? response.data.tasks : []); // Ensure response is an array
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
                {Array.isArray(tasks) && tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskItems key={task.id} task={task} />
                    ))
                ) : (
                    <li>No tasks available</li>
                )}
            </ul>
        </div>
    );
};

export default TaskLists;
