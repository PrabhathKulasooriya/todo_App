import React from 'react'

function TaskData({taskName,description,date}) {
  return (
    <div className="task-data-display">
        <h1>Task : {taskName}</h1>
        <p>Description : {description}</p>
        <p>Date: {date}</p>
    </div>
  )
}

export default TaskData
