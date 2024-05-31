// controllers/UserController.js
const User = require('../models/User');

// Controller untuk membuat pengguna baru
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, profile_picture, bio, open_to_work } = req.body;
        const newUser = await User.addUser({
            name,
            email,
            password,
            profile_picture,
            bio,
            open_to_work
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua pengguna
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan pengguna berdasarkan ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk memperbarui pengguna berdasarkan ID
exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, profile_picture, bio, open_to_work } = req.body;
        const updatedUser = await User.updateUserById(id, {
            name,
            email,
            password,
            profile_picture,
            bio,
            open_to_work
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk menghapus pengguna berdasarkan ID
exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        await User.deleteUserById(id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = exports;
