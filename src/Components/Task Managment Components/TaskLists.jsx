import React, { useState, useEffect } from 'react';
import axiosInstance from '../AxiosHelper';
import TaskItems from './TaskItems';
import TaskStats from './TaskStats';

const TaskLists = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/task/getAll');
        setTasks(response.data.tasks);
        setFilteredTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks!', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/task/getCategories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories!', error);
      }
    };

    fetchTasks();
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      setFilteredTasks(tasks.filter(task => task.category === category));
    } else {
      setFilteredTasks(tasks);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <ul>
        {filteredTasks.map(task => (
          <TaskItems key={task.taskId} task={task} />
        ))}
      </ul>
      <TaskStats tasks={filteredTasks} />
    </div>
  );
};

export default TaskLists;
