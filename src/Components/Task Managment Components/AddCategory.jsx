import React, { useState } from 'react';
import axiosInstance from '../AxiosHelper';

const AddCategory = ({ onCategoryAdded }) => {
    const [addCategory, setAddCategory] = useState('');
    const [catDescription, setCatDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/task/addCategory', { name: addCategory, description: catDescription });
            console.log(response.data);
            onCategoryAdded(); // Callback to switch back to TaskForm
        } catch (error) {
            console.error('Add Category Error, Try Again!', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={addCategory}
                    onChange={(e) => setAddCategory(e.target.value)}
                    placeholder='Enter Category'
                    required
                />
                <textarea
                    value={catDescription}
                    onChange={(e) => setCatDescription(e.target.value)}
                    placeholder='Enter Description'
                    required
                ></textarea>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;
