const { User, DeletedUser } = require('../database/schemas') 
const bcrypt = require('bcrypt');

const adminController = {

    addUser: async (req, res) => {
        try {
            const { username, phone, password } = req.body;
            const user = await User.findOne({username});
            if (user) { 
                res.status(400).json({message: 'Username already taken'});
                return;
            }
            const phoneExist = await User.findOne({phone});
            if (phoneExist) { 
                res.status(400).json({message: 'Phone number already registered'});
                return;
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username: username,
                phone: phone,
                password: hashedPassword,
                registrationDate: new Date()
            })
            await newUser.save();
            res.redirect('/adminPage')
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { username } = req.body;
            const user = await User.findOne({username});
            if (!user) { 
                res.status(400).json({message: `User doesn't exist`});
                return;
            }
            await User.findOneAndDelete({username: username})

            const deletedUser = new DeletedUser({
                username: user.username,
                phone: user.phone,
                registrationDate: user.registrationDate,
                deletionDate: new Date()
            })
            await deletedUser.save();
            res.redirect('/adminPage')
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    editUser: async (req, res) => {
        try {
            const { username, newUsername, newPhone, newPassword } = req.body;
            const user = await User.findOne({username});
            if (!user) { 
                res.status(400).json({message: `User doesn't exist`});
                return;
            }
            if (newUsername) {
                user.username = newUsername;
            }
            if (newPhone) {
                user.phone = newPhone; 
            }
            if (newPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashedPassword;
            }

            await user.save();
            res.redirect('/adminPage') 
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    getDeletedUsers: async (req, res) => {
        try {
            const deletedUsers = await DeletedUser.find({})
            deletedUsers.forEach(user => {
                user.registrationDate = user.registrationDate.toLocaleString('en-US', {timeZone: 'Asia/Almaty'});
                user.deletionDate = user.deletionDate.toLocaleString('en-US', {timeZone: 'Asia/Almaty'});
            });
            res.render('pages/deletedUsersPage', {deletedUsers: deletedUsers});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: err.message});
        }
    },

    getlastActive: async (req, res) => {
        try {
            const users = await User.find({})
            users.forEach(user => {
                user.lastActive = user.lastActive.toLocaleString('en-US', {timeZone: 'Asia/Almaty'});
            });
            res.render('pages/lastActive', {lastActive: users});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: err.message});
        }
    },

};

module.exports = { adminController }
