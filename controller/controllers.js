const { User } = require('../database/userSchema') 
const axios = require('axios');
const bcrypt = require('bcryptjs');


const controller = {

    getRegistrationPage: async (req, res) => {
        await res.render('pages/registration')
    },

    register: async (req, res) => {
        const { username, phone, password, repassword } = req.body;
        if (password!== repassword) {
            res.status(400).json({message: 'Passwords do not match'});
            return;
        }
        const phoneExist = await User.findOne({phone});
        if (phoneExist) { 
            res.status(400).json({message: 'Phone number already registered'});
            return;
        }
        if (await User.findOne({username})) { 
            res.status(400).json({message: 'Username already taken'});
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            phone: phone,
            password: hashedPassword,
            registrationDate: new Date(),
            lastActive: new Date()
        });
        await newUser.save();
        res.redirect('/login')
    },

    getLoginPage: async (req, res) => {
        await res.render('pages/login')
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        if (username === 'Azat' && password === 'azat') {
            res.redirect('/adminPage');
            return; 
        }

        const user = await User.findOne({username});
        if (user && bcrypt.compareSync(password, user.password)) {
            user.lastActive = new Date();
            await user.save();
            res.redirect('/main')
        } else {
            res.status(400).json({message: 'Username or password is incorrect'});
        }
    },

    getAdminPage: async (req, res) => {
        const users = await User.find({})
        users.forEach(user => { 
            user.registrationDate = user.registrationDate.toLocaleString('en-US', {timeZone: 'Asia/Almaty'})
            user.lastActive = user.lastActive.toLocaleString('en-US', {timeZone: 'Asia/Almaty'})
        })
        await res.render('pages/adminPanel', {users: users})
    },

    
    getMainPage: async (req, res) => {
        const imageUrl = req.query.imageUrl || '';
        await res.render('pages/main', { imageUrl: imageUrl })
    },

    generateImage: async (req, res) => {
        const { image } = req.body;
        try {
            const response = await axios.post(
              'https://api.openai.com/v1/images/generations',
              {
                prompt: image,
                n: 1,                              
                size: '512x512',                     
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer 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`,
                },
              }
            );
            res.redirect(`/main?imageUrl=${encodeURIComponent(response.data.data[0].url)}`);
          } catch (error) {
            res.status(500).send('An error occurred while generating the image.');
          }
    },

    getWeatherPage: async (req, res) => {
        await res.render('pages/weather')
    },

    getWeatherData: async (req, res) => {
        const { city } = req.body;
        const weatherApiKey = process.env.WEATHER_API_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

        try {
            const response = await axios.get(weatherUrl);
            const weatherData = response.data;
            console.log(weatherData);
            res.render('pages/weather', { weatherData: weatherData });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error fetching weather data.');
        }
    },

}

module.exports = {User, controller}