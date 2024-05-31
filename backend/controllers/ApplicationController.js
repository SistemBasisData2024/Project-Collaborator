const Application = require('../models/Application');

// Controller untuk menambahkan aplikasi baru
exports.createApplication = async (req, res) => {
    try {
        const { project_id, applicant_id, status } = req.body;
        const newApplication = await Application.addApplication({
            project_id,
            applicant_id,
            status
        });
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua aplikasi
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.getAllApplications();
        res.status(200).json(applications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan aplikasi berdasarkan ID
exports.getApplicationById = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const application = await Application.getApplicationById(applicationId);
        if (application) {
            res.status(200).json(application);
        } else {
            res.status(404).json({ error: 'Application not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk memperbarui aplikasi berdasarkan ID
exports.updateApplicationById = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { project_id, applicant_id, status } = req.body;
        const updatedApplication = await Application.updateApplicationById(applicationId, {
            project_id,
            applicant_id,
            status
        });
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk menghapus aplikasi berdasarkan ID
exports.deleteApplicationById = async (req, res) => {
    try {
        const applicationId = req.params.id;
        await Application.deleteApplicationById(applicationId);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
