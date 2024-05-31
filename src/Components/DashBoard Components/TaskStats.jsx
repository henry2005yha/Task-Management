import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axiosInstance from '../AxiosHelper';

const TaskStats = ({ tasks }) => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    const calculateStats = () => {
      const completed = tasks.filter(task => task.status === 'complete').length;
      const pending = tasks.filter(task => task.status === 'pending').length;
      const total = tasks.length;
      setStats({ total, completed, pending });
    };
    calculateStats();
  }, [tasks]);

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
