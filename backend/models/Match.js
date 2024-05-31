const { Pool } = require('pg');
const pool = require('../config/database');

// Fungsi untuk menambahkan match ke tabel
const addMatch = async (matchData) => {
  const { user_id, potential_collaborator_id, match_score } = matchData;
  const addMatchQuery = `
    INSERT INTO matches (user_id, potential_collaborator_id, match_score)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(addMatchQuery, [user_id, potential_collaborator_id, match_score]);
    client.release();
    return result.rows[0]; // Mengembalikan data match yang baru ditambahkan
  } catch (error) {
    console.error('Error adding match:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua match
const getAllMatches = async () => {
  const getAllMatchesQuery = `
    SELECT * FROM matches
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getAllMatchesQuery);
    client.release();
    return result.rows; // Mengembalikan semua data match
  } catch (error) {
    console.error('Error getting all matches:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan match berdasarkan ID
const getMatchById = async (matchId) => {
  const getMatchQuery = `
    SELECT * FROM matches WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getMatchQuery, [matchId]);
    client.release();
    return result.rows[0]; // Mengembalikan data match yang ditemukan
  } catch (error) {
    console.error('Error getting match by ID:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui match berdasarkan ID
const updateMatchById = async (matchId, updatedData) => {
  const { user_id, potential_collaborator_id, match_score } = updatedData;
  const updateMatchQuery = `
    UPDATE matches
    SET user_id = $1, potential_collaborator_id = $2, match_score = $3
    WHERE id = $4
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(updateMatchQuery, [user_id, potential_collaborator_id, match_score, matchId]);
    client.release();
    return result.rows[0]; // Mengembalikan data match yang telah diperbarui
  } catch (error) {
    console.error('Error updating match by ID:', error);
    throw error;
  }
};

// Fungsi untuk menghapus match berdasarkan ID
const deleteMatchById = async (matchId) => {
  const deleteMatchQuery = `
    DELETE FROM matches WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    await client.query(deleteMatchQuery, [matchId]);
    client.release();
  } catch (error) {
    console.error('Error deleting match by ID:', error);
    throw error;
  }
};

module.exports = { addMatch, getAllMatches, getMatchById, updateMatchById, deleteMatchById };
