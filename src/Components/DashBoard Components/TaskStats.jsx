import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axiosInstance from '../AxiosHelper';

const TaskStats = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get('/task/get'); // Adjust endpoint if necessary
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats!', error);
      }
    };
    fetchStats();
  }, []);

  const data = [
    { name: 'Completed Tasks', value: stats.completed },
    { name: 'Pending Tasks', value: stats.pending },
  ];

  const COLORS = ['#00C49F', '#FFBB28'];

  return (
    <div>
      <h2>Task Statistics</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={[{ name: 'Total Tasks', value: stats.total }]}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={110}
          fill="#82ca9d"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TaskStats;
