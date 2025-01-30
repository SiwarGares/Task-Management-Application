require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth-routes');
const taskRoutes = require('./routes/task-routes');

const app = express();
connectDB();

app.use(express.json());
console.log('MONGO_URI:', process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
