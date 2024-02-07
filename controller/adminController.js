// controller.js
const { User } = require('../controller/controllers');
const bcrypt = require('bcrypt');

const adminController = {

    addUser: async (req, res) => {
        const { username, phone, password } = req.body;
        const userExist = await User.findOne({username});
        if (userExist) { 
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
    },

    deleteUser: async (req, res) => {
        const { username } = req.body;
        const userExist = await User.findOne({username});
        if (!userExist) { 
            res.status(400).json({message: `User doesn't exist`});
            return;
        }
        await User.findOneAndDelete({username: username})
        res.redirect('/adminPage')
    },

    deleteUserById: async (req, res) => {
        const { id } = req.body;
        const userExist = await User.findOne({_id: id});
        if (!userExist) { 
            res.status(400).json({message: `User doesn't exist`});
            return;
        }
        await User.findOneAndDelete({_id: id})
        res.redirect('/adminPage')
    }

};

module.exports = { adminController }
