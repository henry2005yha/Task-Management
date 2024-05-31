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

    const completedPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const pendingPercentage = totalTasks === 0 ? 0 : (pendingTasks / totalTasks) * 100;

    return (
        <div>
            {totalTasks > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
                    <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                fill="#82ca9d"
                                paddingAngle={0}
                                dataKey="value"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div>
                        <div style={{ marginBottom: '30px', fontSize: '24px' }}>
                            <strong>Total Tasks: {totalTasks}</strong>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <strong>Completed Tasks: {completedTasks} ({completedPercentage.toFixed(2)}%)</strong>
                            <div style={{ background: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', height: '20px', width: '100%', marginTop: '10px' }}>
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
                        <div>
                            <strong>Pending Tasks: {pendingTasks} ({pendingPercentage.toFixed(2)}%)</strong>
                            <div style={{ background: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', height: '20px', width: '100%', marginTop: '10px' }}>
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
                </div>
            ) : (
                <p>No tasks to display statistics</p>
            )}
        </div>
    );
};

export default TaskStats;