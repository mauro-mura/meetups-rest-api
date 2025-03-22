// routes/authRoutes.js - Handles authentication routes
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loadData, saveData } = require('../utils/fileUtils');
const { secretKey } = require('../config/config');
const AppError = require('../utils/AppError');
const router = express.Router();
const usersFile = 'users.json';
let users = loadData(usersFile);

router.post('/signup', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new AppError('Invalid input', 400);
        if (users.find(user => user.email === email)) throw new AppError('User exists', 400);
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ email, password: hashedPassword });
        saveData(usersFile, users);
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email);
        if (!user || !(await bcrypt.compare(password, user.password))) throw new AppError('Invalid credentials', 401);
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

module.exports = router;