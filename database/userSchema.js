const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({username: String, phone: String, password: String, registrationDate: Date});
const User = mongoose.model('User', userSchema, 'users');

module.exports = {User}