// models/Project.js
const pool = require('../config/database'); // Menggunakan pool koneksi dari konfigurasi database

// Fungsi untuk menambahkan proyek ke tabel
const addProject = async (projectData) => {
  const { title, description, owner_id, status } = projectData;
  const addProjectQuery = `
    INSERT INTO projects (title, description, owner_id, status)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(addProjectQuery, [title, description, owner_id, status]);
    client.release();
    return result.rows[0]; // Mengembalikan data proyek yang baru ditambahkan
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua proyek
const getAllProjects = async () => {
  const getAllProjectsQuery = `
    SELECT * FROM projects
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getAllProjectsQuery);
    client.release();
    return result.rows; // Mengembalikan semua data proyek
  } catch (error) {
    console.error('Error getting all projects:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan proyek berdasarkan ID
const getProjectById = async (projectId) => {
  const getProjectQuery = `
    SELECT * FROM projects WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(getProjectQuery, [projectId]);
    client.release();
    return result.rows[0]; // Mengembalikan data proyek yang ditemukan
  } catch (error) {
    console.error('Error getting project by ID:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui proyek berdasarkan ID
const updateProjectById = async (projectId, updatedData) => {
  const { title, description, owner_id, status } = updatedData;
  const updateProjectQuery = `
    UPDATE projects
    SET title = $1, description = $2, owner_id = $3, status = $4
    WHERE id = $5
    RETURNING *
  `;

  try {
    const client = await pool.connect();
    const result = await client.query(updateProjectQuery, [title, description, owner_id, status, projectId]);
    client.release();
    return result.rows[0]; // Mengembalikan data proyek yang telah diperbarui
  } catch (error) {
    console.error('Error updating project by ID:', error);
    throw error;
  }
};

// Fungsi untuk menghapus proyek berdasarkan ID
const deleteProjectById = async (projectId) => {
  const deleteProjectQuery = `
    DELETE FROM projects WHERE id = $1
  `;

  try {
    const client = await pool.connect();
    await client.query(deleteProjectQuery, [projectId]);
    client.release();
  } catch (error) {
    console.error('Error deleting project by ID:', error);
    throw error;
  }
};

module.exports = { addProject, getAllProjects, getProjectById, updateProjectById, deleteProjectById };
