Name: Website for Image Generation and Searching Movies

TO RUN PROGRAM: npm start

ABOUT API ->
    Image generation: OPENAI API
        link: https://platform.openai.com/api-keys
    Movie search: OMDb API
        link: https://www.omdbapi.com/
    Weather information: OpenWeather API
        link: https://openweathermap.org/api


CONTROLLER ->
    controllers.js file: contains all functions to be executed such as registrating, logging and redirecting users;

    adminController.js file: contains all functions to be executed by admin

    imageController.js file: contains functions to generate images and get access to history to see generated images 

    movieController.js file: contains functions to get movie data and get access to history to see searched movies

    weatherController.js file: contains functions to get weather data and get access to history to see searched cities with weather data4


DATABASE ->
    schemas.js file: contains schemas, database collections for MongoDB

ROUTES ->
    router.js file: contains several routes for routing users, movies, images, weather infos and the admin

.env ->:
    contains API keys

TO GET ACCESS TO ADMIN PAGE ->
    username: Azat
    password: azat

    