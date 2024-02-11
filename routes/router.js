const express = require('express');
const router = express.Router();
const { controller } = require('../controller/controllers');
const { adminController } = require('../controller/adminController');
const { imageController } = require('../controller/imageController');
const { weatherController } = require('../controller/weatherController');
const { movieController } = require('../controller/movieController');

// User routes
router.get('/', controller.getRegistrationPage);
router.post('/getDataFromReg', controller.register);
router.get('/login', controller.getLoginPage);
router.post('/getDataFromLog', controller.login);

// Image generator routes
router.get('/main', imageController.getMainPage);
router.post('/main', imageController.generateImage);
router.get('/historyImage', imageController.getHistoryPage)

// Movie routes
router.get('/movie', movieController.getMoviePage)
router.post('/movie', movieController.getMovieData)
router.get('/historyMovie', movieController.getHistoryPage)

// Weather app routes
router.get('/weather', weatherController.getWeatherPage);
router.post('/weather', weatherController.getWeatherData);
router.get('/historyCity', weatherController.getHistoryPage)

// Admin routes
router.get('/adminPage', controller.getAdminPage);
router.post('/addUser', adminController.addUser);
router.post('/deleteUser', adminController.deleteUser);
router.post('/editUser', adminController.editUser);
router.get('/deletedUsers', adminController.getDeletedUsers);
router.get('/lastActive', adminController.getlastActive);

module.exports = router;
