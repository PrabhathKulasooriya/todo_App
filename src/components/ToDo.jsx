import React from "react";
import TaskForm from "./TaskForm";

function ToDo({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
  onUpdateTask,
  taskToEdit,
  isEditing,
  setIsEditing,
}) {
  return (
    <div className="container-todo">
      <h1 className="todo-title">Todo Tasks</h1>
      <TaskForm
        onAddTask={onAddTask}
        onUpdateTask={onUpdateTask}
        taskToEdit={taskToEdit}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      <h2 className="task-list-title">Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Please add some tasks.</p>
      ) : (
        <ul className="task-list list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <h3 className="task-name">{task.taskName}</h3>
              <p>
                <strong>Description : </strong> {task.description}
              </p>
              <p>
                <strong>Date : </strong> {task.date}
              </p>
              <div className="task-buttons">
                <button
                  className="complete-btn"
                  onClick={() => onCompleteTask(index)}
                >
                  Complete
                </button>
                <button className="edit-btn" onClick={() => onEditTask(index)}>
                  Edit
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

export default ToDo;
