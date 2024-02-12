const { MovieData } = require('../database/schemas')

const movieController = {

    getMoviePage: async (req, res) => {
        const movieData = req.query.movieData ? JSON.parse(decodeURIComponent(req.query.movieData)) : null;
        await res.render('pages/movie', {movieData: movieData});
    },

    getMovieData: async (req, res) => {
        const { movie } = req.body;
        const movieApiKey = process.env.MOVIE_API_KEY;
        const movieURL = `https://omdbapi.com/?s=${movie}&page=1&apikey=${movieApiKey}`;
    
        try {
            const response = await fetch(movieURL);
            const movieData = await response.json();
            const newMovieData = new MovieData({
                title: movie,
                data: movieData,
                date: new Date()
            });
            await newMovieData.save();
            res.redirect(`/movie?movieData=${encodeURIComponent(JSON.stringify(movieData))}`);
        } catch (error) {   
            console.error('Error:', error);
            res.status(500).send('Error fetching movie data.');
        }
    },

    getHistoryPage: async (req, res) => {
        const movies = await MovieData.find({})
        await res.render('pages/historyMovies', {MovieData: movies})
    },
    
}

module.exports = { movieController }