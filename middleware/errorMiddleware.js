// middleware/errorMiddleware.js - Global error handler
const errorMiddleware = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({ message: err.message || 'Server error' });
};

module.exports = errorMiddleware;