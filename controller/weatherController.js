const axios = require('axios');

const weatherController = {

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
            res.render('pages/weatherResult', { weatherData: weatherData });
        } catch (error) {   
            console.error('Error:', error);
            res.status(500).send('Error fetching weather data.');
        }
    },
}

module.exports = { weatherController }