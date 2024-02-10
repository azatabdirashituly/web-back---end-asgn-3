const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String, 
    phone: String, 
    password: String, 
    registrationDate: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema, 'users');

const deletedUserSchema = new mongoose.Schema({
    username: String, 
    phone: String,
    registrationDate: { type: Date, default: Date.now },
    deletionDate: { type: Date, default: null }
});

const DeletedUser = mongoose.model('DeletedUser', deletedUserSchema, 'deletedUsers');

module.exports = {User, DeletedUser};