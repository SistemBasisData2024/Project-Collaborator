const { Pool } = require('pg');
const pool = require('../config/database');

// Fungsi untuk menambahkan pesan ke tabel
const addMessage = async (messageData) => {
  const { sender_id, receiver_id, message } = messageData;
  const addMessageQuery = `
    INSERT INTO messages (sender_id, receiver_id, message)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(addMessageQuery, [sender_id, receiver_id, message]);
    client.release();
    return result.rows[0]; // Mengembalikan data pesan yang baru ditambahkan
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua pesan
const getAllMessages = async () => {
  const getAllMessagesQuery = `
    SELECT * FROM messages
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getAllMessagesQuery);
    client.release();
    return result.rows; // Mengembalikan semua data pesan
  } catch (error) {
    console.error('Error getting all messages:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan pesan berdasarkan ID
const getMessageById = async (messageId) => {
  const getMessageQuery = `
    SELECT * FROM messages WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getMessageQuery, [messageId]);
    client.release();
    return result.rows[0]; // Mengembalikan data pesan yang ditemukan
  } catch (error) {
    console.error('Error getting message by ID:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui pesan berdasarkan ID
const updateMessageById = async (messageId, updatedData) => {
  const { sender_id, receiver_id, message } = updatedData;
  const updateMessageQuery = `
    UPDATE messages
    SET sender_id = $1, receiver_id = $2, message = $3
    WHERE id = $4
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(updateMessageQuery, [sender_id, receiver_id, message, messageId]);
    client.release();
    return result.rows[0]; // Mengembalikan data pesan yang telah diperbarui
  } catch (error) {
    console.error('Error updating message by ID:', error);
    throw error;
  }
};

// Fungsi untuk menghapus pesan berdasarkan ID
const deleteMessageById = async (messageId) => {
  const deleteMessageQuery = `
    DELETE FROM messages WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    await client.query(deleteMessageQuery, [messageId]);
    client.release();
  } catch (error) {
    console.error('Error deleting message by ID:', error);
    throw error;
  }
};

module.exports = { addMessage, getAllMessages, getMessageById, updateMessageById, deleteMessageById };
