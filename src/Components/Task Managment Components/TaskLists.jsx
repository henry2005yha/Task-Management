import React, { useEffect, useState } from 'react';
import TaskItems from './TaskItems';
import axiosInstance from '../AxiosHelper';
import TaskStats from '../DashBoard Components/TaskStats';
import './tasklist.css';
 
const TaskLists = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('view-all');
    const [filteredTasks, setFilteredTasks] = useState([]);
 
    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get('/task/get');
            const tasksData = response.data.tasks || [];
            setTasks(tasksData);
            setFilteredTasks(tasksData);
        } catch (error) {
            console.error('Error fetching tasks', error.message);
        }
    };
 
    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/task/getCategories');
            setCategories(response.data.categories || []);
        } catch (error) {
            console.error('Error fetching categories', error.message);
        }
    };
 
    useEffect(() => {
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
            <TaskStats tasks={filteredTasks} />
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="view-all">View All Tasks</option>
                {categories.map(category => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
                
            </select>
            {selectedCategory ? (
                filteredTasks.length > 0 ? (
                    <ul>
                        {filteredTasks.map(task => (
                            <TaskItems key={task.taskId} task={task} onUpdate={fetchTasks} />
                        ))}
                    </ul>
                ) : (
                    <p>No tasks available for the selected category</p>
                )
            ) : (
                <p>Please select a category to view tasks</p>
            )}
        </div>
    );
};
 
export default TaskLists;