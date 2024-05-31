import React, { useEffect, useState } from 'react';
import TaskItems from './TaskItems';
import axiosInstance from '../AxiosHelper';
import TaskStats from '../DashBoard Components/TaskStats';
import './tasklist.css'

const TaskLists = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get('/tasks/getAll'); // Ensure this endpoint exists in your backend
                const tasksData = response.data.tasks || [];
                setTasks(tasksData);
                setFilteredTasks(tasksData);
            } catch (error) {
                console.error('Error fetching tasks', error.message);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/tasks/getCategories'); // Ensure this endpoint exists in your backend
                setCategories(response.data.categories || []);
            } catch (error) {
                console.error('Error fetching categories', error.message);
            }
        };

        fetchTasks();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'view-all') {
            setFilteredTasks(tasks);
        } else if (selectedCategory) {
            setFilteredTasks(tasks.filter(task => task.category === selectedCategory));
        } else {
            setFilteredTasks([]);
        }
    }, [selectedCategory, tasks]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    
    return (
        <div className='task-lists-container'> 
            <h2 className="task-lists-heading">Task Lists</h2>
            <select  className="task-lists-select" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
                <option value="view-all">View All Tasks</option>
            </select>
            {selectedCategory ? (
                filteredTasks.length > 0 ? (
                    <ul>
                        {filteredTasks.map(task => (
                             <table className="task-lists-table">
                             <thead>
                                 <tr>
                                     <th>Task ID</th>
                                     <th>Title</th>
                                     <th>Description</th>
                                     <th>Category</th>
                                     <th>Status</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 {filteredTasks.map(task => (
                                     <TaskItems key={task.taskId} task={task} />
                                 ))}
                             </tbody>
                         </table>
                        ))}
                    </ul>
                ) : (
                    <p className="task-lists-empty">No tasks available for the selected category</p>
                )
            ) : (
                <p>Please select a category to view tasks</p>
            )}
            <TaskStats tasks={filteredTasks} />
        </div>
    );
};

export default TaskLists;
