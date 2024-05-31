// controllers/RatingController.js
const Rating = require('../models/Rating');

// Controller untuk membuat penilaian baru
exports.createRating = async (req, res) => {
    try {
        const { project_id, user_id, rating, review } = req.body;
        const newRating = await Rating.addRating({
            project_id,
            user_id,
            rating,
            review
        });
        res.status(201).json(newRating);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua penilaian
exports.getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.getAllRatings();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan penilaian berdasarkan ID
exports.getRatingById = async (req, res) => {
    try {
        const ratingId = req.params.id;
        const rating = await Rating.getRatingById(ratingId);
        if (rating) {
            res.status(200).json(rating);
        } else {
            res.status(404).json({ error: 'Rating not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk memperbarui penilaian berdasarkan ID
exports.updateRatingById = async (req, res) => {
    try {
        const ratingId = req.params.id;
        const updatedData = req.body;
        const updatedRating = await Rating.updateRatingById(ratingId, updatedData);
        if (updatedRating) {
            res.status(200).json(updatedRating);
        } else {
            res.status(404).json({ error: 'Rating not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk menghapus penilaian berdasarkan ID
exports.deleteRatingById = async (req, res) => {
    try {
        const ratingId = req.params.id;
        await Rating.deleteRatingById(ratingId);
        res.status(204).json(); // Mengembalikan respons tanpa konten
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
