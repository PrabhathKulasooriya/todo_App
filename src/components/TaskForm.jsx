import React, { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";

function TaskForm({
  onAddTask,
  onUpdateTask,
  taskToEdit,
  isEditing,
  setIsEditing,
}) {
  const [taskName, setTaskName] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [isShrunk, setIsShrunk] = useState(true);

  // Populate form when editing
  useEffect(() => {
    if (taskToEdit && isEditing) {
      setTaskName(taskToEdit.taskName);
      setText(taskToEdit.description);
      setDate(taskToEdit.date);
      setIsShrunk(false);
    }
  }, [taskToEdit, isEditing]);

  const toggleForm = () => {
    if (!isShrunk) {
      setTaskName("");
      setText("");
      setDate("");
      if (isEditing) {
        setIsEditing(false);
      }
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

    const taskData = {
      taskName: taskName,
      description: text,
      date: date,
    };

    if (isEditing) {
      onUpdateTask(taskData);
      setIsEditing(false);
    } else {
      onAddTask(taskData);
    }

    setTaskName("");
    setText("");
    setDate("");
    toggleForm();
  };

  const clearForm = (event) => {
    event.preventDefault();
    setTaskName("");
    setText("");
    setDate("");
  };

  const closeForm = (event) => {
    event.preventDefault();
    if (isEditing) {
      setIsEditing(false);
    }
    toggleForm();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="task-form-container">
      <div className="create-task-button-container">
        {!isEditing && (
          <button
            className={`create-task-btn ${isShrunk ? "" : "shrunk"}`}
            onClick={toggleForm}
          >
            {isShrunk ? "+ Add New Task " : ""}
          </button>
        )}
      </div>
      <div
        className={`task-form-div ${isShrunk && !isEditing ? "shrunk" : ""}`}
      >
        <form
          action=""
          className={`task-form ${isShrunk && !isEditing ? "shrunk" : ""}`}
        >
          <button className="close-btn" onClick={closeForm}>
            <GrClose size={28} />
          </button>
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
              cols="70"
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
              {isEditing ? "Update" : "Add Task"}
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
