const express = require('express');
const bodyparser = require('body-parser');

const router = require('./routes/router')
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: false}));
app.use('/', router)

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})