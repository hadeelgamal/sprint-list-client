import React from 'react'
import Task from "./Task";


function SprintCard({   title, dueDate, currentStatus })  {
  return (
    <div>
        <h3>{title}</h3>
        <h4>{dueDate}</h4>
        <h4>{currentStatus}</h4>
        <Task />

    </div>
  )
}

export default SprintCard