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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // New state for filter

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
    let filtered = tasks;
    if (selectedCategory !== 'view-all') {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter === 'completed') {
      filtered = filtered.filter(task => task.status === 'complete');
    } else if (statusFilter === 'pending') {
      filtered = filtered.filter(task => task.status !== 'complete');
    }
    setFilteredTasks(filtered);
  }, [selectedCategory, searchQuery, tasks, statusFilter]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  return (
    <div className="task-list-container">
      <TaskStats tasks={filteredTasks} />
      <div className="filter-container">
        <select value={selectedCategory} onChange={handleCategoryChange} className="filter-select">
          <option value="view-all">View All Tasks</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => handleStatusFilterChange(e.target.value)} className="filter-select">
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
          className="search-input"
        />
      </div>
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
