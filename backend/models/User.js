const { Pool } = require('pg');
const pool = require('../config/database');

// Fungsi untuk menambahkan user ke tabel
const addUser = async (userData) => {
  const { name, email, password, profile_picture, bio, open_to_work } = userData;
  const addUserQuery = `
    INSERT INTO users (name, email, password, profile_picture, bio, open_to_work)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(addUserQuery, [name, email, password, profile_picture, bio, open_to_work]);
    client.release();
    return result.rows[0]; // Mengembalikan data user yang baru ditambahkan
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan user berdasarkan ID
const getUserById = async (id) => {
  const getUserByIdQuery = `
    SELECT * FROM users WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getUserByIdQuery, [id]);
    client.release();
    return result.rows[0]; // Mengembalikan data user yang ditemukan
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua pengguna
const getAllUsers = async () => {
  const getAllUsersQuery = `
    SELECT * FROM users
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getAllUsersQuery);
    client.release();
    return result.rows; // Mengembalikan semua data pengguna
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui informasi user berdasarkan ID
const updateUserById = async (id, updatedData) => {
    const { name, email, password, profile_picture, bio, open_to_work } = updatedData;
    const updateUserQuery = `
        UPDATE users
        SET name = $1, email = $2, password = $3, profile_picture = $4, bio = $5, open_to_work = $6, updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *
    `;

    try {
        const client = await pool.connect();
        const result = await client.query(updateUserQuery, [name, email, password, profile_picture, bio, open_to_work, id]);
        client.release();
        return result.rows[0]; // Mengembalikan data user yang telah diperbarui
    } catch (error) {
        console.error('Error updating user by ID:', error);
        throw error;
    }
};

// Fungsi untuk menghapus user berdasarkan ID
const deleteUserById = async (id) => {
    const deleteUserQuery = `
        DELETE FROM users WHERE id = $1
    `;

    try {
        const client = await pool.connect();
        await client.query(deleteUserQuery, [id]);
        client.release();
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        throw error;
    }
};

// Eksport semua fungsi
module.exports = { addUser, getUserById, getAllUsers, updateUserById, deleteUserById };
