import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:1111/api/tasks/addTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, completed }),
        });
        if (response.ok) {
            const newTask = await response.json();
            console.log('Task added:', newTask);
        } else {
            console.error('Failed to add task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Task</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            /><p/>
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            /><p/>
            <label>
                Completed:
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                />
            </label>
            <button type="submit">Add Task</button><p/>
            <Link to="/">Back to Home</Link>
        </form>
    );
}

export default AddTask;
