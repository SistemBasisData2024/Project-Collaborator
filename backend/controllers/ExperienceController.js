const Experience = require('../models/Experience');

// Controller untuk menambahkan pengalaman baru
exports.createExperience = async (req, res) => {
    try {
        const { user_id, project_id, role, description, start_date, end_date } = req.body;
        const newExperience = await Experience.addExperience({
            user_id,
            project_id,
            role,
            description,
            start_date,
            end_date
        });
        res.status(201).json(newExperience);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua pengalaman
exports.getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.getAllExperiences();
        res.status(200).json(experiences);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan pengalaman berdasarkan ID
exports.getExperienceById = async (req, res) => {
    try {
        const experienceId = req.params.id;
        const experience = await Experience.getExperienceById(experienceId);
        if (experience) {
            res.status(200).json(experience);
        } else {
            res.status(404).json({ error: 'Experience not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk memperbarui pengalaman berdasarkan ID
exports.updateExperienceById = async (req, res) => {
    try {
        const experienceId = req.params.id;
        const { user_id, project_id, role, description, start_date, end_date } = req.body;
        const updatedExperience = await Experience.updateExperienceById(experienceId, {
            user_id,
            project_id,
            role,
            description,
            start_date,
            end_date
        });
        res.status(200).json(updatedExperience);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk menghapus pengalaman berdasarkan ID
exports.deleteExperienceById = async (req, res) => {
    try {
        const experienceId = req.params.id;
        await Experience.deleteExperienceById(experienceId);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
