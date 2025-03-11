import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskservices";
import axios from "axios";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");

  // Create a new task
  const handleCreateTask = async () => {
    if (!newTaskName.trim()) return;
    try {
      await createTask({ name: newTaskName, isActive: true });
      setNewTaskName("");
      loadTasks();
    } catch (error) {
      console.error("Error creating task", error);
    }

    fetchData();
  };

  // Edit task
  const handleEditTask = (task) => {
    setEditTaskId(task.id);
    setEditTaskName(task.name);
    fetchData();
  };

  // Update task
  const handleUpdateTask = async () => {
    if (!editTaskName.trim()) return;
    try {
      await updateTask(editTaskId, { name: editTaskName, isActive: true });
      setEditTaskId(null);
      setEditTaskName("");
      loadTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
    fetchData();
  };

  // Toggle task completion
  const handleToggleTask = async (task) => {
    try {
      await updateTask(task.id, { ...task, isActive: !task.isActive });
      loadTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }

    fetchData();
  };

  // Fetch data on component mount
  const fetchData = () => {
    const response = axios.get("http://localhost:8080/getAll").then((response) => {
      console.log("Fetched tasks:", response.data);
      setTasks(response.data); // Store data in state
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <div className="todo-container">
      <h1 className="todo-title">To Do List</h1>

      {/* Create Task */}
      <div className="todo-input-container">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Enter new task"
          className="todo-input"
        />
        <button onClick={handleCreateTask} className="todo-add-button">
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className="todo-item">
            {editTaskId === task.id ? (
              <>
                {/* Editing Task */}
                <input
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  className="todo-edit-input"
                />
                <button onClick={handleUpdateTask} className="todo-save-button">
                  Save
                </button>
                <button onClick={() => setEditTaskId(null)} className="todo-cancel-button">
                  Cancel
                </button>
              </>
            ) : (
              <>
                {/* Display Task */}
                <span
                  className={`todo-task-name ${!task.isActive ? "todo-completed" : ""}`}
                  onClick={() => handleToggleTask(task)}
                >
                  {task.name}
                </span>
                <button onClick={() => handleEditTask(task)} className="todo-edit-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteTask(task.id)} className="todo-delete-button">
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
