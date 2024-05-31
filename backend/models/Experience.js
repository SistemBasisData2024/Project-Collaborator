const { Pool } = require('pg');
const pool = require('../config/database');

// Fungsi untuk menambahkan pengalaman ke tabel
const addExperience = async (experienceData) => {
  const { user_id, project_id, role, description, start_date, end_date } = experienceData;
  const addExperienceQuery = `
    INSERT INTO experiences (user_id, project_id, role, description, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(addExperienceQuery, [user_id, project_id, role, description, start_date, end_date]);
    client.release();
    return result.rows[0]; // Mengembalikan data pengalaman yang baru ditambahkan
  } catch (error) {
    console.error('Error adding experience:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua pengalaman
const getAllExperiences = async () => {
  const getAllExperiencesQuery = `
    SELECT * FROM experiences
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getAllExperiencesQuery);
    client.release();
    return result.rows; // Mengembalikan semua data pengalaman
  } catch (error) {
    console.error('Error getting all experiences:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan pengalaman berdasarkan ID
const getExperienceById = async (experienceId) => {
  const getExperienceQuery = `
    SELECT * FROM experiences WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getExperienceQuery, [experienceId]);
    client.release();
    return result.rows[0]; // Mengembalikan data pengalaman yang ditemukan
  } catch (error) {
    console.error('Error getting experience by ID:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui pengalaman berdasarkan ID
const updateExperienceById = async (experienceId, updatedData) => {
  const { user_id, project_id, role, description, start_date, end_date } = updatedData;
  const updateExperienceQuery = `
    UPDATE experiences
    SET user_id = $1, project_id = $2, role = $3, description = $4, start_date = $5, end_date = $6
    WHERE id = $7
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(updateExperienceQuery, [user_id, project_id, role, description, start_date, end_date, experienceId]);
    client.release();
    return result.rows[0]; // Mengembalikan data pengalaman yang telah diperbarui
  } catch (error) {
    console.error('Error updating experience by ID:', error);
    throw error;
  }
};

// Fungsi untuk menghapus pengalaman berdasarkan ID
const deleteExperienceById = async (experienceId) => {
  const deleteExperienceQuery = `
    DELETE FROM experiences WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    await client.query(deleteExperienceQuery, [experienceId]);
    client.release();
  } catch (error) {
    console.error('Error deleting experience by ID:', error);
    throw error;
  }
};

module.exports = { addExperience, getAllExperiences, getExperienceById, updateExperienceById, deleteExperienceById };
