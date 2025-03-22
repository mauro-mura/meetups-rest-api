// server.js - Entry point of the application
const express = require('express');
const app = express();
const port = 3000;
const meetupRoutes = require('./routes/meetupRoutes');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(express.json());
app.use('/meetups', meetupRoutes);
app.use('/auth', authRoutes);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});