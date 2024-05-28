import React, { useEffect, useState } from 'react'

const TaskList = () => {

    const [stats, setStats] = useState({total: 0, completed: 0, pending: 0});
    useEffect(()=>{
        const fetchStats = async () =>{
            try {
                const response = await axios.get('');
                setStats(response.data)
            } catch (error) {
                console.error('Error fetching Task Stats !', error);
            }
        };
        fetchStats();
    },[]);

  return (
    <div>
      <h2>Task Statistics</h2>
      <p>Total Tasks: {stats.total}</p>
      <p>Completed Tasks: {stats.completed}</p>
      <p>Pending Tasks: {stats.pending }</p>
    </div>
  )
}

export default TaskList
