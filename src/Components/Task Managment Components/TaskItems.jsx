import axios from 'axios';
import React from 'react'

const TaskItems = ({task}) => {

    const handleDelete = async () => {
        try {
            await axios.delete(``);
        } catch (error) {
            console.error('Error in Deleting Tasks', error);
        }
    };
    const handleComplete = async () => {
        try {
            await axios.put(``, {...task, status: 'completed'});
        } catch (error) {
            console.error('Error in updating Tasks', error);
        }
    };
    return (
        <li>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button onClick={handleComplete}>Mark as Complete</button>
          <button onClick={handleDelete}>Delete</button>
        </li>
      );
}


export default TaskItems
