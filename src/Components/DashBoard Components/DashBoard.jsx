import React from 'react'
import TaskStats from './TaskStats'
import TaskLists from '../Task Managment Components/TaskLists'

const DashBoard = () => {
  return (
    <div>
      <h1>DashBoard</h1>
      <TaskStats />
      <TaskLists />
    </div>
  )
}

export default DashBoard
