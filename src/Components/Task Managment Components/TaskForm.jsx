import React, { useState, useEffect } from 'react';
import axiosInstance from '../AxiosHelper';
import AddCategory from './AddCategory'; // Ensure the correct import path
import './taskform.css';
 
const TaskForm = ({ task, onSave, onAddCategoryClick }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [status, setStatus] = useState(task ? task.status : 'pending');
    const [deadline, setDeadline] = useState(task ? task.deadline : '');
    const [category, setCategory] = useState(task ? task.category : '');
    const [categories, setCategories] = useState([]);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
 
    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/task/getCategories');
            const responseData = response.data;
            if (responseData && typeof responseData === 'object' && Array.isArray(responseData.categories)) {
                const categoryData = responseData.categories;
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
        const taskData = { title, description, status, deadline,category };
        try {
            let response;
            if (task) {
                response = await axiosInstance.put(`/task/update/${task.id}`, taskData);
            } else {
                response = await axiosInstance.post('/task/create?category', taskData);
            }
            const responseData = response.data;
            if (responseData.status) {
                setMessage(responseData.message);
                setError('');
                if (onSave) {
                    onSave();  // Ensure onSave is defined before calling it
                }
            } else {
                setMessage('');
                setError('Failed to save the task. Please try again.');
            }
        } catch (error) {
            console.error('Error Saving Task!', error);
            setMessage('');
            setError('An error occurred while saving the task. Please try again.');
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
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
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