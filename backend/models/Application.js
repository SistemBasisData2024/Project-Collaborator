const { Pool } = require('pg');
const pool = require('../config/database');

// Fungsi untuk menambahkan aplikasi ke tabel
const addApplication = async (applicationData) => {
  const { project_id, applicant_id, status } = applicationData;
  const addApplicationQuery = `
    INSERT INTO applications (project_id, applicant_id, status)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(addApplicationQuery, [project_id, applicant_id, status]);
    client.release();
    return result.rows[0]; // Mengembalikan data aplikasi yang baru ditambahkan
  } catch (error) {
    console.error('Error adding application:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua aplikasi
const getAllApplications = async () => {
  const getAllApplicationsQuery = `
    SELECT * FROM applications
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getAllApplicationsQuery);
    client.release();
    return result.rows; // Mengembalikan semua data aplikasi
  } catch (error) {
    console.error('Error getting all applications:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan aplikasi berdasarkan ID
const getApplicationById = async (applicationId) => {
  const getApplicationQuery = `
    SELECT * FROM applications WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getApplicationQuery, [applicationId]);
    client.release();
    return result.rows[0]; // Mengembalikan data aplikasi yang ditemukan
  } catch (error) {
    console.error('Error getting application by ID:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui aplikasi berdasarkan ID
const updateApplicationById = async (applicationId, updatedData) => {
  const { project_id, applicant_id, status } = updatedData;
  const updateApplicationQuery = `
    UPDATE applications
    SET project_id = $1, applicant_id = $2, status = $3
    WHERE id = $4
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(updateApplicationQuery, [project_id, applicant_id, status, applicationId]);
    client.release();
    return result.rows[0]; // Mengembalikan data aplikasi yang telah diperbarui
  } catch (error) {
    console.error('Error updating application by ID:', error);
    throw error;
  }
};

// Fungsi untuk menghapus aplikasi berdasarkan ID
const deleteApplicationById = async (applicationId) => {
  const deleteApplicationQuery = `
    DELETE FROM applications WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    await client.query(deleteApplicationQuery, [applicationId]);
    client.release();
  } catch (error) {
    console.error('Error deleting application by ID:', error);
    throw error;
  }
};

module.exports = { addApplication, getAllApplications, getApplicationById, updateApplicationById, deleteApplicationById };
