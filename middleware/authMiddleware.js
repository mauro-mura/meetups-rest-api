// middleware/authMiddleware.js - Authentication middleware
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');
const AppError = require('../utils/AppError');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new AppError('Unauthorized', 401);
    jwt.verify(authHeader.split(' ')[1], secretKey, (err, user) => {
        if (err) throw new AppError('Invalid token', 403);
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };