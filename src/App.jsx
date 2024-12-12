import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ToDo from "./components/ToDo";
import Completed from "./components/Completed";
import Deleted from "./components/Deleted";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];
    const savedDeletedTasks =
      JSON.parse(localStorage.getItem("deletedTasks")) || [];
    setTasks(savedTasks);
    setCompletedTasks(savedCompletedTasks);
    setDeletedTasks(savedDeletedTasks);
  }, []);

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (index, source = "todo") => {
    let taskToDelete;
    if (source === "todo") {
      taskToDelete = tasks[index];
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else if (source === "completed") {
      taskToDelete = completedTasks[index];
      const updatedCompletedTasks = completedTasks.filter(
        (_, i) => i !== index
      );
      setCompletedTasks(updatedCompletedTasks);
      localStorage.setItem(
        "completedTasks",
        JSON.stringify(updatedCompletedTasks)
      );
    }
    const updatedDeletedTasks = [...deletedTasks, taskToDelete];
    setDeletedTasks(updatedDeletedTasks);
    localStorage.setItem("deletedTasks", JSON.stringify(updatedDeletedTasks));
  };

  const editTask = (index) => {
    setTaskToEdit(tasks[index]);
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task, i) =>
      i === editIndex ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskToEdit(null);
    setEditIndex(null);
    setIsEditing(false);
  };

  const permanentlyDeleteTask = (index) => {
    const updatedDeletedTasks = deletedTasks.filter((_, i) => i !== index);
    setDeletedTasks(updatedDeletedTasks);
    localStorage.setItem("deletedTasks", JSON.stringify(updatedDeletedTasks));
  };

  const completeTask = (index) => {
    const taskToComplete = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    const updatedCompletedTasks = [...completedTasks, taskToComplete];
    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks)
    );
  };

  const restoreTaskCompleted = (index) => {
    const taskToRestore = completedTasks[index];
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    const updatedTasks = [...tasks, taskToRestore];
    setCompletedTasks(updatedCompletedTasks);
    setTasks(updatedTasks);
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks)
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const restoreTaskDeleted = (index) => {
    const taskToRestore = deletedTasks[index];
    const updatedDeletedTasks = deletedTasks.filter((_, i) => i !== index);
    const updatedTasks = [...tasks, taskToRestore];
    setDeletedTasks(updatedDeletedTasks);
    setTasks(updatedTasks);
    localStorage.setItem("deletedTasks", JSON.stringify(updatedDeletedTasks));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="container-app">
      <Navbar />
      <div className="container-path">
        <Routes>
          <Route
            path="/"
            element={
              <ToDo
                tasks={tasks}
                onAddTask={addTask}
                onEditTask={editTask}
                onDeleteTask={(index) => deleteTask(index, "todo")}
                onCompleteTask={completeTask}
                onUpdateTask={handleUpdateTask}
                taskToEdit={taskToEdit}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            }
          />
          <Route
            path="/completed"
            element={
              <Completed
                tasks={completedTasks}
                onDeleteTask={(index) => deleteTask(index, "completed")}
                onRestoreTaskCompleted={restoreTaskCompleted}
              />
            }
          />
          <Route
            path="/deleted"
            element={
              <Deleted
                tasks={deletedTasks}
                onPermanentlyDelete={permanentlyDeleteTask}
                onRestoreTaskDeleted={restoreTaskDeleted}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
