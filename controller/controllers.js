const { User } = require('../database/userSchema') 
const bcrypt = require('bcrypt');
const { Resend } = require('resend'); 


const controller = {

    getRegistrationPage: async (req, res) => {
        await res.render('pages/registration')
    },

    register: async (req, res) => {
        const { username, phone, password, repassword } = req.body;
        if (password!== repassword) {
            res.status(400).json({message: 'Passwords do not match'});
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
    getMainPage: async (req, res) => {
        await res.render('pages/main')
    },

    getAdminPage: async (req, res) => {
        const users = await User.find({})
        users.forEach(user => {
            user.registrationDate = user.registrationDate.toLocaleString('en-US', {timeZone: 'Asia/Almaty'})
            user.lastActive = user.lastActive.toLocaleString('en-US', {timeZone: 'Asia/Almaty'})
        })
        await res.render('pages/adminPanel', {users: users})
    },
}

module.exports = {User, controller}