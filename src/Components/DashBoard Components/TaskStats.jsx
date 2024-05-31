import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const TaskStats = ({ tasks = [] }) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'complete').length;
    const pendingTasks = totalTasks - completedTasks;

    const data = [
        { name: 'Completed Tasks', value: completedTasks },
        { name: 'Pending Tasks', value: pendingTasks },
    ];

    const COLORS = ['#00C49F', '#FFBB28'];

    return (
        <div>
            <h2>Task Statistics</h2>
            {totalTasks > 0 ? (
                <PieChart width={400} height={400}>
                    <Pie
                        data={[{ name: 'Total Tasks', value: totalTasks }]}
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
            ) : (
                <p>No tasks to display statistics</p>
            )}
        </div>
    );
};

export default TaskStats;
