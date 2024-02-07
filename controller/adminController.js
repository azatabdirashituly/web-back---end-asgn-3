// controller.js
const mongoose = require('mongoose');

const { User } = require('../controller/controllers');

const adminController = {
    getAdminPage: async (req, res) => {
        const users = await User.find();
        res.render('adminPage', { users });
    },

    addUser: async (req, res) => {
        // Handle adding a new user to the database
        // Redirect back to the admin page
    },

    getEditUserPage: async (req, res) => {
        // Retrieve user data by ID and display an edit form
        res.render('editUserPage', { user });
    },

    updateUser: async (req, res) => {
        // Handle updating user data in the database
        // Redirect back to the admin page
    },

    getConfirmDeletePage: async (req, res) => {
        // Display a confirmation prompt to delete a user
        res.render('confirmDeletePage', { user });
    },

    deleteUser: async (req, res) => {
        // Handle deleting a user from the database
        // Redirect back to the admin page
    }
};

module.exports = adminController;
