const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 25 },
    description: { type: String, maxlength: 255 },
    status: { type: String, default: 'open', enum: ['open', 'in progress', 'pending', 'completed'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dueDate: { type: Date, required: true, validate: [v => v > new Date(), 'Due date must be in the future'] },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);