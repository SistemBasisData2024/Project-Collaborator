// controllers/RatingController.js
const pool = require("../config/database");

// Controller untuk membuat penilaian baru
exports.createRating = async (req, res) => {
    const id = req.params.id;
    const { rating, review } = req.body;

    try {
        const result = await pool.query(`UPDATE ratings SET rating = $1, review = $2 WHERE id = $3`, [rating, review, id]);
        
        res.status(201).json(result.rows[0]); // Mengembalikan data rating yang baru ditambahkan
    } 
    
    catch (error) {
        console.error('Error adding rating:', error);
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua penilaian
exports.getAllRatingsByUser = async (req, res) => {
    const id = req.params.user_id;

    try {
        const result = await pool.query(`SELECT * FROM ratings WHERE reviewer_id = $1`, [id]);
        res.status(200).json(result.rows); // Mengembalikan semua data rating
    } 
    
    catch (error) {
        console.error('Error getting all ratings:', error);
        res.status(400).json({ error: error.message });
    }
};
