const express = require('express');
const router = express.Router();
const { controller } = require('../controller/controllers')
const { adminController } = require('../controller/adminController')


router.get('/', controller.getRegistrationPage)
router.post('/getDataFromReg', controller.register)
router.get('/login', controller.getLoginPage)
router.post('/getDataFromLog', controller.login)
router.get('/main', controller.getMainPage)

router.get('/adminPage', controller.getAdminPage)
router.post('/addUser', adminController.addUser)
router.post('/deleteUser', adminController.deleteUser)
router.post('/deleteUserById', adminController.deleteUser)

module.exports = router;