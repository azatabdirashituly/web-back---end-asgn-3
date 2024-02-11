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

const searchedImagesSchema = new mongoose.Schema({
    title: String,
    url: { type: String, default: null },
    date: { type: Date, default: null }
});

const SearchedImages = mongoose.model('SearchedImages', searchedImagesSchema,'searchedImages');

const movieDataSchema = new mongoose.Schema({
    data: Object
})

const MovieData = mongoose.model('MovieData', movieDataSchema, 'movies' )

module.exports = {User, DeletedUser, SearchedImages, MovieData};