const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const router = require('./routes/router')
require('dotenv').config({path: './.env'});

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: false}));
app.use('/', router)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})