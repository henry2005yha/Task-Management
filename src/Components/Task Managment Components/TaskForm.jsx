import React, { useState, useEffect } from 'react';
import axiosInstance from '../AxiosHelper';
import AddCategory from './AddCategory';
import './taskform.css';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const TaskForm = ({ onSave, onAddCategoryClick }) => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [deadline, setDeadline] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            if (taskId) {
                try {
                    console.log(`Fetching task with ID: ${taskId}`);
                    const response = await axiosInstance.get(`/task/getById?taskId=${taskId}`);
                    console.log('API Response:', response.data);
    
                    // Access the task data from response.data.tasks[0]
                    const taskData = response.data.tasks[0] || {};
    
                    console.log('Fetched task data:', taskData);
    
                    setTitle(taskData.title ?? '');
                    setDescription(taskData.description ?? '');
                    setStatus(taskData.status ?? 'pending');
                    setDeadline(taskData.deadline ? taskData.deadline.substring(0, 16) : '');
                    setCategory(taskData.category ?? '');
    
                    console.log('Title:', taskData.title);
                    console.log('Description:', taskData.description);
                    console.log('Status:', taskData.status);
                    console.log('Deadline:', taskData.deadline);
                    console.log('Category:', taskData.category);
                } catch (error) {
                    console.error('Error fetching task', error);
                }
            }
        };
        fetchTask();
    }, [taskId]);
    

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/task/getCategories');
            const responseData = response.data;
            if (responseData && Array.isArray(responseData.categories)) {
                setCategories(responseData.categories);
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
        const taskData = { title, description, status, deadline, category };
        try {
            let response;
            if (taskId) {
                response = await axiosInstance.put(`/task/edit?taskId=${taskId}`, taskData);
                swal("Success!", "You have updated your task.", "success");
            } else {
                response = await axiosInstance.post('/task/create', taskData);
                swal("Success!", "You have added a task.", "success");
            }
            const responseData = response.data;
            if (responseData.status) {
                setMessage(responseData.message);
                setError('');
                if (onSave) {
                    onSave();  // Ensure onSave is defined before calling it
                }
                navigate('/dashboard');
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

    useEffect(() => {
        if (error) {
            swal("Error!", error, "error");
        }
    }, [error]);

    return (
        <div className='task-form-container'>
            {showAddCategory ? (
                <AddCategory onCategoryAdded={handleCategoryAdded} />
            ) : (
                <form onSubmit={handleSubmit} className="task-form">
                    <h2>{taskId ? 'Edit Task' : 'Create Task'}</h2>
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
