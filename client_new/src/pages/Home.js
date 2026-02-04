import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('http://localhost:1111/api/tasks');
            const data = await response.json();
            setTasks(data);
        };
        fetchTasks();
    }, []);


    const updateTask = async (_id) => {
        const taskToUpdate = tasks.find((task) => task._id === _id);
        if (taskToUpdate) {
            const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
            const response = await fetch('http://localhost:1111/api/tasks/updateTask', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });
            if (response.ok) {
                setTasks(tasks.map((task) => (task._id === _id ? updatedTask : task)));
            } else {
                console.error('Failed to update task');
            }
        }
    };

    const deleteTask = async (_id) => {
        const response = await fetch(`http://localhost:1111/api/tasks/deleteTask/${_id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setTasks(tasks.filter((task) => task._id !== _id));
        } else {
            console.error('Failed to delete task');
        }
    };

    return (
        <div>
            <h1>My Tasks</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => updateTask(task._id)}
                        /> Completed
                        <p/>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Link to="/addTask">You have new tasks?</Link>
        </div>
    );
}

export default Home;
