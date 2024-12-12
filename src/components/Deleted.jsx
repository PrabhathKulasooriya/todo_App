import React from "react";

function Deleted({ tasks, onPermanentlyDelete, onRestoreTaskDeleted }) {
  return (
    <div className="container-deleted">
      <h1 className="todo-title">Deleted Tasks</h1>
      {tasks.length === 0 ? (
        <p>No deleted tasks.*</p>
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
                  className=" delete-btn restore-btn"
                  onClick={() => onRestoreTaskDeleted(index)}
                >
                  Restore
                </button>
                <button
                  className="delete-btn permrently-delete-btn"
                  onClick={() => onPermanentlyDelete(index)}
                >
                  Permanently Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Deleted;
