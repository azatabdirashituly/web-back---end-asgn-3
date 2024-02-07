const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://azatabdirashituly:20feb2005@cluster0.sellypx.mongodb.net/')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`Couldn't connect ${err}`));

const userSchema = new mongoose.Schema({username: String, phone: String, password: String, registrationDate: Date});
const User = mongoose.model('User', userSchema, 'users');

const controller = {

    getRegistrationPage: async (req, res) => {
        await res.render('pages/registration')
    },

    register: async (req, res) => {
        const { username, phone, password, repassword } = req.body;
        if (password!== repassword) {
            res.status(400).json({message: 'Passwords do not match'});
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
            registrationDate: new Date()
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
        await res.render('pages/adminPanel', {users: users})
    },

}

module.exports = {User, controller}