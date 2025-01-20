const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
        const task = await Task.create({
            title,
            description,
            dueDate,
            userId: req.user.id,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get User's Tasks
exports.getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ _id: id, userId: req.user.id });
        if (!task) throw new Error('Task not found or access denied');
        Object.assign(task, req.body);
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!task) throw new Error('Task not found or access denied');
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
