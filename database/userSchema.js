const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String, 
    phone: String, 
    password: String, 
    registrationDate: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now } 
    });
const User = mongoose.model('User', userSchema, 'users');

module.exports = {User}