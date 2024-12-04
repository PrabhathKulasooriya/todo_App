import React from 'react'
import "./css/ToDo.css";
import TaskForm from './TaskForm'
import TaskData from './TaskData';


function ToDo() {
  
  return (
    <div className="container-todo">
        <h1>Todo Tasks</h1>
        <TaskForm />
        <TaskData />
    </div>
  );
}

export default ToDo

