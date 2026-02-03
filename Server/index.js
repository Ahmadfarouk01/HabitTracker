    const express = require('express');
    const dotenv = require('dotenv');
    const connectDB = require('./config/db');
    const habitRoutes = require('./routes/HabitRoutes');
    const todoRoutes = require('./routes/TodoRoutes');
    const authRoutes = require('./routes/AuthRoutes');
    const { errorHandler, notFound } = require('./middleware/ErrorMiddleware');
    const cors = require("cors");

    dotenv.config();
    connectDB();

    
    const app = express();
    app.use(express.json());
    
    app.use(cors({
      origin: "https://habittracker-frontend-jrfy.onrender.com", // frontend URL
      methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
      credentials: true // allow cookies if needed
    }));


    app.use('/api/habits', habitRoutes);
    app.use('/api/todos', todoRoutes);
    app.use('/api/auth', authRoutes);

    app.use(notFound);
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
