import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks
  const fetchTasks = async () => {
    const response = await fetch('https://esjr3yj5mm7z4vdtwehrreykoy0trckc.lambda-url.ap-south-1.on.aws/', { method: 'GET' });
    const data = await response.json();
    setTasks(data);
  };

  // Add task
  const addTask = async () => {
    await fetch('https://esjr3yj5mm7z4vdtwehrreykoy0trckc.lambda-url.ap-south-1.on.aws/', {
      method: 'POST',
      body: JSON.stringify({ title: newTask })
    });
    fetchTasks(); // Refresh list
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="App">
      <input 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => <li key={task.taskId}>{task.title}</li>)}
      </ul>
    </div>
  );
}
