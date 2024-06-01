import React, { useState } from 'react';
import axiosInstance from '../AxiosHelper';
import './add.css';  // Import the CSS file

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
        <div className="add-category-container">
            <h1>Add Category</h1>
            <form className="add-category-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="add-category-input"
                    value={addCategory}
                    onChange={(e) => setAddCategory(e.target.value)}
                    placeholder='Enter Category'
                    required
                />
                <textarea
                    className="add-category-textarea"
                    value={catDescription}
                    onChange={(e) => setCatDescription(e.target.value)}
                    placeholder='Enter Description'
                    required
                ></textarea>
                <button type="submit" className="add-category-button">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;
