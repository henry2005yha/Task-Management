import React, { useState, useEffect } from 'react';
import axiosInstance from '../AxiosHelper';
import AddCategory from './AddCategory'; // Ensure the correct import path
import './taskform.css';

const TaskForm = ({ task, onSave }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [status, setStatus] = useState(task ? task.status : 'pending');
    const [deadline, setDeadline] = useState(task ? task.deadline : '');
    const [category, setCategory] = useState(task ? task.category : '');
    const [categories, setCategories] = useState([]);
    const [showAddCategory, setShowAddCategory] = useState(false);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/task/getCategories');
            const responseData = response.data;
           
            if (responseData && typeof responseData === 'object' && Array.isArray(responseData.categories)) {
                const categoryData = response.data.categories;
                console.log(categoryData);
                setCategories(categoryData);
            } else {
                console.error('API is not responding correctly', responseData);
            }
        } catch (error) {
            console.error('Category Error', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description, status, deadline };
        try {
            if (task) {
                await axiosInstance.put(`/task/update/${task.id}`, taskData);
            } else {
                await axiosInstance.post(`/task/create?category=${category}`, taskData);
            }
            onSave();
        } catch (error) {
            console.error('Error Saving Task!', error);
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory === "add-category") {
            setShowAddCategory(true);
        } else {
            setCategory(selectedCategory);
        }
    };

    const handleCategoryAdded = () => {
        setShowAddCategory(false);
        fetchCategories(); // Refetch categories after a new one has been added
    };

    return (
        <div className='task-form-container'>
            {showAddCategory ? (
                <AddCategory onCategoryAdded={handleCategoryAdded} />
            ) : (
                <form onSubmit={handleSubmit} className="task-form">
                    <h2>Create Tasks</h2>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Title"
                        required
                        className="task-input"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Description"
                        required
                        className="task-textarea"
                    ></textarea>
                    <input
                        type="datetime-local"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                        className="task-input"
                    />
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        required
                        className="task-select"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                        <option value="add-category">Add Categories</option>
                    </select>
                    <button type="submit" className='task-button'>Save Task</button>
                </form>
            )}
        </div>
    );
};

export default TaskForm;
