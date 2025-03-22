// utils/fileUtils.js - Utility functions for file operations
const fs = require('fs');

const loadData = (file) => {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (err) {
        return [];
    }
};

const saveData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

module.exports = { loadData, saveData };