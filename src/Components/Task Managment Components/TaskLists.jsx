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
                const response = await axiosInstance.get('/task/get'); // Ensure this endpoint exists in your backend
                const tasksData = response.data.tasks || [];
                setTasks(tasksData);
                setFilteredTasks(tasksData);
            } catch (error) {
                console.error('Error fetching tasks', error.message);
            }
        };
 
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/task/getCategories'); // Ensure this endpoint exists in your backend
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
        <div className="task-list-container">
            <h2>Task Lists</h2>
            <select value={selectedCategory} onChange={handleCategoryChange}>
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
                            <TaskItems key={task.taskId} task={task} />
                        ))}
                    </ul>
                ) : (
                    <p>No tasks available for the selected category</p>
                )
            ) : (
                <p>Please select a category to view tasks</p>
            )}
            <TaskStats tasks={filteredTasks} />
        </div>
    );
};
 
export default TaskLists;
 