import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

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
                const response = await axios.get('http://localhost:8080/taskmanagement/task/getCategories');
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
        const taskData = {title, description, status, deadline, category};
        try {
            if(task){
                await axios.put(``, taskData);
            }else{
                await axios.post('', taskData);
            }
            onSave();
        } catch (error) {
            console.error('Error Saving Task !', error);         
        }
    };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTiltle(e.target.value)} placeholder="Enter Title" required/>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" required></textarea>
        <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} required/>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
        <button type="submit">Save Task</button>
      </form>
    </div>
  )
}

export default TaskForm
