const { WeatherDataCollection } = require('../database/schemas') 

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
            const newWeatherData = WeatherDataCollection({
                city: weatherData.name,
                temp: weatherData.main.temp,
                feels_like: weatherData.main.feels_like,
                description: weatherData.weather[0].description,
                humidity:  weatherData.main.humidity,
                wind_speed: weatherData.wind.speed,
                date: new Date()
            })
            await newWeatherData.save()
            res.redirect(`/weather?weatherData=${encodeURIComponent(JSON.stringify(weatherData))}`);
        } catch (error) {   
            console.error('Error:', error);
            res.status(500).send('Error fetching weather data.');
        }
    },

    getHistoryPage: async (req, res) => {
        const weatherData = await WeatherDataCollection.find({})
        await res.render('pages/historyCities', {WeatherData: weatherData})
    },
}

module.exports = { weatherController }