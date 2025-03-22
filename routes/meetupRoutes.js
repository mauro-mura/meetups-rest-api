// routes/meetupRoutes.js - Handles meetup routes
const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { loadData, saveData } = require('../utils/fileUtils');
const AppError = require('../utils/AppError');
const router = express.Router();
const dataFile = 'meetups.json';
let meetups = loadData(dataFile);
let idCounter = meetups.length ? Math.max(...meetups.map(m => m.id)) + 1 : 1;

router.post('/', authenticateToken, (req, res, next) => {
    try {
        const { title, summary, address } = req.body;
        if (!title || !summary || !address) throw new AppError('Invalid input', 400);
        const meetup = { id: idCounter++, title, summary, address };
        meetups.push(meetup);
        saveData(dataFile, meetups);
        res.status(201).json(meetup);
    } catch (error) {
        next(error);
    }
});

router.get('/', (req, res, next) => {
    try {
        res.json(meetups);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', authenticateToken, (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, summary, address } = req.body;
        const meetup = meetups.find(m => m.id == id);
        if (!meetup) throw new AppError('Meetup not found', 404);
        if (title) meetup.title = title;
        if (summary) meetup.summary = summary;
        if (address) meetup.address = address;
        saveData(dataFile, meetups);
        res.json(meetup);
    } catch (error) {
        next(error);
    }
});

module.exports = router;