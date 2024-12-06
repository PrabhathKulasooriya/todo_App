import React from "react";

function Completed({ tasks, onDeleteTask, onRestoreTaskCompleted}) {
  return (
    <div className="container-completed">
      <h1 className="todo-title">Completed Tasks</h1>
      {tasks.length === 0 ? (
        <p>No completed tasks.*</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <h3>{task.taskName}</h3>
              <p>
                <strong>Description : </strong> {task.description}
              </p>
              <p>
                <strong>Date : </strong> {task.date}
              </p>
              <div className="task-buttons">
                <button
                  className="delete-btn restore-btn"
                  onClick={() => onRestoreTaskCompleted(index)}
                >
                  Restore
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Completed;
