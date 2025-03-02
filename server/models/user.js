const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, maxlength: 25 },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);