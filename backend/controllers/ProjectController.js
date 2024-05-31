const Project = require('../models/Project');

// Controller untuk membuat proyek baru
exports.createProject = async (req, res) => {
    try {
        const { title, description, owner_id, status } = req.body;
        const newProject = await Project.addProject({
            title,
            description,
            owner_id,
            status
        });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua proyek
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan proyek berdasarkan ID
exports.getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.getProjectById(projectId);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk memperbarui proyek berdasarkan ID
exports.updateProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { title, description, owner_id, status } = req.body;
        const updatedProject = await Project.updateProjectById(projectId, { title, description, owner_id, status });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk menghapus proyek berdasarkan ID
exports.deleteProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        await Project.deleteProjectById(projectId);
        res.status(204).json(); // Mengembalikan tanpa konten jika penghapusan berhasil
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

