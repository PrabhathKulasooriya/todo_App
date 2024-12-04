import React, { useState } from 'react'
import './css/TaskForm.css'
import TaskData from './TaskData';

function TaskForm() {
    const [taskName,setTaskName] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [isShrunk, setIsShrunk] = useState(true);
    const [data, setData] = useState({taskName:"",description:"",date:""});

    const toggleForm = () => {
        if(!isShrunk){
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

     const displayDataHandler = () =>{
            event.preventDefault(); 
            setData({
                taskName: taskName,
                description: text,
                date: date,
            }
            );
            setTaskName("");
            setText("");
            setDate("");
     }

  return (
    <div className="task-form-container">
      <button className="create-task-btn" onClick={toggleForm}>
        {isShrunk ? "Add New Task" : "Close Form"}
      </button>

      <form action="" className={`task-form ${isShrunk ? "shrunk" : ""}`}>
        <div className="task">
          <label htmlFor="name">Task Name : </label>
          <input type="text" id="name" value={taskName} onChange={handleTaskNameChange} />
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
          <input type="date" id="date" value={date} onChange={handleDateChange} />
        </div>

        <div className="buttons">
          <button className="cancel-btn btn" onClick={toggleForm}>
            Cancel
          </button>
          <button className="submit-btn btn" onClick={displayDataHandler}>
            Submit
          </button>
        </div>
      </form>

      <TaskData
        taskName={data.taskName}
        description={data.description}
        date={data.date}      
      />
    </div>
  );
}

export default TaskForm
