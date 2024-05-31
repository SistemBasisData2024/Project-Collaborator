const { Pool } = require('pg');
const pool = require('../config/database');

// Fungsi untuk menambahkan rating ke tabel
const addRating = async (ratingData) => {
  const { project_id, user_id, rating, review } = ratingData;
  const addRatingQuery = `
    INSERT INTO ratings (project_id, user_id, rating, review)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(addRatingQuery, [project_id, user_id, rating, review]);
    client.release();
    return result.rows[0]; // Mengembalikan data rating yang baru ditambahkan
  } catch (error) {
    console.error('Error adding rating:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua rating
const getAllRatings = async () => {
  const getAllRatingsQuery = `
    SELECT * FROM ratings
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getAllRatingsQuery);
    client.release();
    return result.rows; // Mengembalikan semua data rating
  } catch (error) {
    console.error('Error getting all ratings:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan rating berdasarkan ID
const getRatingById = async (ratingId) => {
  const getRatingQuery = `
    SELECT * FROM ratings WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getRatingQuery, [ratingId]);
    client.release();
    return result.rows[0]; // Mengembalikan data rating yang ditemukan
  } catch (error) {
    console.error('Error getting rating by ID:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui rating berdasarkan ID
const updateRatingById = async (ratingId, updatedData) => {
  const { project_id, user_id, rating, review } = updatedData;
  const updateRatingQuery = `
    UPDATE ratings
    SET project_id = $1, user_id = $2, rating = $3, review = $4
    WHERE id = $5
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(updateRatingQuery, [project_id, user_id, rating, review, ratingId]);
    client.release();
    return result.rows[0]; // Mengembalikan data rating yang telah diperbarui
  } catch (error) {
    console.error('Error updating rating by ID:', error);
    throw error;
  }
};

// Fungsi untuk menghapus rating berdasarkan ID
const deleteRatingById = async (ratingId) => {
  const deleteRatingQuery = `
    DELETE FROM ratings WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    await client.query(deleteRatingQuery, [ratingId]);
    client.release();
  } catch (error) {
    console.error('Error deleting rating by ID:', error);
    throw error;
  }
};

module.exports = { addRating, getAllRatings, getRatingById, updateRatingById, deleteRatingById };
