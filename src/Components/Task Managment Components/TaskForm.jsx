import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './taskform.css';
import axiosInstance from '../AxiosHelper';

const TaskForm = ({task, onSave}) => {
    const [title, setTiltle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [status, setStatus] = useState(task ? task.status : 'pending'); 
    const [deadline, setDeadline] = useState(task ? task.deadline :'');
    const [category, setCategory] = useState(task ? task.category : '');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () =>{
            try {
                const response = await axiosInstance.get('http://localhost:8080/taskmanagement/task/getCategories');
                const categoryData = response.data;
               
                if(Array.isArray(categoryData)){
                    setCategories(categoryData);
                }else{
                    console.error('API is not responding', categoryData);
                }

            } catch (error) {
                console.error('Category Error', error);
            }
        };
        fetchCategories();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {title, description, status, deadline};
        try {
            if(task){
                await axios.put(``, taskData);
            }else{
                await axiosInstance.post(`/task/create?category=${category}`, taskData);
            }
            onSave();
        } catch (error) {
            console.error('Error Saving Task !', error);         
        }
    };
  return (
    <div className='task-form-container'>
      <form onSubmit={handleSubmit} className="task-form">
      <h2>Create Tasks</h2>
        <input type="text" value={title} onChange={(e) => setTiltle(e.target.value)} placeholder="Enter Title" required className="task-input"/>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" required className="task-textarea"></textarea>
        <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} required className="task-input"/>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required className="task-select">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
        <button type="submit" className='task-button'>Save Task</button>
      </form>
    </div>
  )
}

export default TaskForm
