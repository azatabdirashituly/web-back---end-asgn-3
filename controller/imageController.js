const { SearchedImages } = require('../database/userSchema')
const axios = require('axios');

const imageController = {

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
                  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
              }
            );
            const newData = new SearchedImages({
              title: image,
              url: response.data.data[0].url,
              date: new Date()
            })
            await newData.save()
            res.redirect(`/main?imageUrl=${encodeURIComponent(response.data.data[0].url)}`);
          } catch (error) {
            res.status(500).send('An error occurred while generating the image.');
            console.log(error);
          }
    },

    getHistoryPage: async (req, res) => {
        const images = await SearchedImages.find({})
        await res.render('pages/historyImages', {searchedImages: images})
    },
}

module.exports = { imageController }
