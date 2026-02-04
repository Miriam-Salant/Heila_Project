const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().lean();
        if (tasks.length === 0) {
            return res.status(404).send({ error: 'No tasks found' });
        }
        return res.json(tasks);
    } catch (error) {
        return res.status(500).send({ error: 'Failed to fetch tasks' });
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).lean();
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }
        return res.json(task);
    } catch (error) {
        return res.status(500).send({ error: 'Failed to fetch task' });
    }
}

const addTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const newTask = await Task.create({ title, description, completed });
        const savedTask = await newTask.save();
        return res.status(201).send(savedTask);
    } catch (error) {
        return res.status(500).send({ error: 'Failed to add task' });
    }
}

const updateTask = async (req, res) => {
    try {
        const taskId = req.body._id;
        if (!taskId) {
            return res.status(400).send({ error: 'Missing _id in body' });
        }
        const { _id, ...updateData } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            console.log("No task found with ID:", taskId);
            return res.status(404).send({ error: 'Task not found in Database' });
        }
        return res.send(updatedTask);
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).send({ error: 'Server error', message: error.message });
    }
}

const deleteTask = async (req, res) => {
    console.log("alj");
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).send({ error: 'Task not found' });
        }
        return res.send({ message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).send({ error: 'Failed to delete task' });
    }
}

module.exports = {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskById
};