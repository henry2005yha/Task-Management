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

    const COLORS = ['#00C49F', '#FFBB28', '#FF8042']; // Adding another color for the third circle

    const completedPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const pendingPercentage = totalTasks === 0 ? 0 : (pendingTasks / totalTasks) * 100;
 
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
                </PieChart>
                
            ) 
            
            : (
                <p>No tasks to display statistics</p>
            )}
             <div style={{ marginBottom: '20px', width: '500px' }}>
                <strong>Total Tasks: {totalTasks}</strong>
                <div style={{ background: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                        width: '100%',
                        background: '#8884d8',
                        height: '20px',
                        textAlign: 'center',
                        color: '#fff',
                        borderRadius: '5px'
                    }}>
                        100%
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: '20px', width: '500px' }}>
                <strong>Completed Tasks: {completedTasks} ({completedPercentage.toFixed(2)}%)</strong>
                <div style={{ background: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${completedPercentage}%`,
                        background: '#00C49F',
                        height: '20px',
                        textAlign: 'center',
                        color: '#fff',
                        borderRadius: '5px'
                    }}>
                        {completedPercentage.toFixed(2)}%
                    </div>
                </div>
            </div>
            <div style={{ width: '500px' }}>
                <strong>Pending Tasks: {pendingTasks} ({pendingPercentage.toFixed(2)}%)</strong>
                <div style={{ background: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${pendingPercentage}%`,
                        background: '#FFBB28',
                        height: '20px',
                        textAlign: 'center',
                        color: '#fff',
                        borderRadius: '5px'
                    }}>
                        {pendingPercentage.toFixed(2)}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskStats;