import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks with error handling
  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://esjr3yj5mm7z4vdtwehrreykoy0trckc.lambda-url.ap-south-1.on.aws/', { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add task with error handling
  const addTask = async () => {
    if (!newTask.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('https://esjr3yj5mm7z4vdtwehrreykoy0trckc.lambda-url.ap-south-1.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTask })
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      setNewTask('');
      await fetchTasks(); // Refresh list
    } catch (err) {
      setError(err.message);
      console.error('Add task error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    fetchTasks(); 
  }, []);

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      
      <div className="task-input">
        <input 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          disabled={isLoading}
        />
        <button onClick={addTask} disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Task'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}
      
      {isLoading && tasks.length === 0 ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.taskId || task.title}>
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
