const weatherController = {

    getWeatherPage: async (req, res) => {
        const weatherData = req.query.weatherData ? JSON.parse(decodeURIComponent(req.query.weatherData)) : null;
        await res.render('pages/weather', { weatherData: weatherData })
    },

    getWeatherData: async (req, res) => {
        const { city } = req.body;
        const weatherApiKey = process.env.WEATHER_API_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

        try {
            const response = await fetch(weatherUrl);
            const weatherData = await response.json();
            console.log(weatherData);
            res.redirect(`/weather?weatherData=${encodeURIComponent(JSON.stringify(weatherData))}`);
        } catch (error) {   
            console.error('Error:', error);
            res.status(500).send('Error fetching weather data.');
        }
    },
}

module.exports = { weatherController }