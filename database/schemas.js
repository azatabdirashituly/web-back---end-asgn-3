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

const SearchedImages = mongoose.model('SearchedImages', searchedImagesSchema,'searchedImagesHistory');

const movieDataSchema = new mongoose.Schema({
    title: String,
    data: Object,
    date: { type: Date, default: null }
})

const MovieData = mongoose.model('MovieData', movieDataSchema, 'moviesHistory' )

const weatherDataSchema = new mongoose.Schema({
    city: String,
    temp: Number,
    feels_like: Number,
    desciption: String,
    humidity: Number,
    wind_speed: Number,
    date: { type: Date, default: null }
});

const WeatherDataCollection = mongoose.model('WeatherData', weatherDataSchema, 'weatherHistory' )

module.exports = {User, DeletedUser, SearchedImages, MovieData, WeatherDataCollection};