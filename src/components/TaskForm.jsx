import React, { useState } from "react";
import "./css/TaskForm.css";

function TaskForm({ onAddTask }) {
  const [taskName, setTaskName] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [isShrunk, setIsShrunk] = useState(true);

  const toggleForm = () => {
    if (!isShrunk) {
      setTaskName("");
      setText("");
      setDate("");
    }
    setIsShrunk((prevState) => !prevState);
  };

  const handleDescriptionChange = (event) => {
    setText(event.target.value);
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const isPastDate = (selectedDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(selectedDate) < today;
  };

  const displayDataHandler = (event) => {
    event.preventDefault();

    if (!taskName.trim() || !date) {
      alert("Please fill in both task name and date!");
      return;
    }

    if (isPastDate(date)) {
      alert("Please select a future date!");
      return;
    }

    const newTask = {
      taskName: taskName,
      description: text,
      date: date,
    };

    onAddTask(newTask);
    setTaskName("");
    setText("");
    setDate("");
    toggleForm();
  };
  const clearForm = ()=>{
    event.preventDefault();
    setTaskName("");
    setText("");
    setDate("");
  }

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="task-form-container">
      <div className="create-task-button-container">
        <button className="create-task-btn" onClick={toggleForm}>
          {isShrunk ? "+ Add New Task " : "Close Form"}
        </button>
      </div>
      <div className="task-form-div">
        <form action="" className={`task-form ${isShrunk ? "shrunk" : ""}`}>
          <div className="task">
            <label htmlFor="name">Task Name : </label>
            <input
              type="text"
              id="name"
              value={taskName}
              onChange={handleTaskNameChange}
            />
          </div>

          <div className="task">
            <label htmlFor="description" className="">
              Description :
            </label>
            <textarea
              value={text}
              onChange={handleDescriptionChange}
              rows="5"
              cols="50"
              id="description"
            />
          </div>

          <div className="task">
            <label htmlFor="date">Date : </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              min={today}
            />
          </div>

          <div className="buttons">
            <button className="submit-btn btn" onClick={displayDataHandler}>
              Add Task
            </button>
            <button className="cancel-btn btn" onClick={clearForm}>
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
