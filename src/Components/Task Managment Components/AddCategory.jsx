import axios from 'axios';
import React, { useState } from 'react'
import axiosInstance from '../AxiosHelper';

const AddCategory = () => {
    const [addCategory, setAddCategory] = useState('');
    const [catDescription, setCatDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/task/addCategory', {addCategory, catDescription});
            const addCatData = response.data;
            console.log(addCatData);
        } catch (error) {
            console.error('Add Category Error, Try Again!', error);
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={addCategory} onChange={(e) => setAddCategory(e.target.value)} placeholder='Enter Category' required />
        <textarea value={catDescription} onChange={(e) => setCatDescription(e.target.value)} placeholder='Enter Description' required></textarea>
      </form>
    </div>
  )
}

export default AddCategory
