const pool = require('../config/database');

// Controller untuk membuat proyek baru
exports.createProject = async (req, res) => {
    const { name, description, owner_id, status } = req.body;

    try {
        const result = await pool.query(`INSERT INTO projects (name, description, owner_id, status)
                VALUES ($1, $2, $3, $4)
                RETURNING *`, [name, description, owner_id, status]);

        res.status(201).json(result.rows[0]); // Mengembalikan data proyek yang baru ditambahkan
    } 
    
    catch (error) {
        console.error('Error adding project:', error);
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua proyek
exports.getAllOpenProjects = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM projects WHERE status = 'OPEN'`);
        res.status(200).json(result.rows); // Mengembalikan semua data proyek
    } 
    
    catch (error) {
        console.error('Error getting all projects:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.getUserRunningProjects = async (req, res) => {
    const id = req.params.user_id;

    try{
        const result = await pool.query(`SELECT * FROM projects WHERE (owner_id = $1 
            OR id = (
                SELECT project_id FROM collaborators WHERE user_id = $1
            )) AND progress = 'RUNNING'`, [id]);

        res.status(200).json(result.rows);
    }

    catch(error){
        console.error('Error getting running projects:', error);
        res.status(400).json({ error: error.message });
    }
}

exports.getUserProjects = async (req, res) => {
    const id = req.params.user_id;

    try{
        const result = await pool.query(`SELECT * FROM projects WHERE owner_id = $1`, [id]);

        res.status(200).json(result.rows);
    }

    catch(error){
        console.error('Error getting user projects:', error);
        res.status(400).json({ error: error.message });
    }
}

exports.getUserExperiences = async (req, res) => {
    const id = req.params.user_id;

    try {
        const result = await pool.query(`SELECT * FROM projects WHERE (owner_id = $1 
                OR id = (
                    SELECT project_id FROM collaborators WHERE user_id = $1
                )) AND progress = 'DONE'`, [id]);
        res.status(200).json(result.rows); // Mengembalikan semua data proyek
    } 
    
    catch (error) {
        console.error('Error getting all projects:', error);
        res.status(400).json({ error: error.message });
    }
}

// Controller untuk mendapatkan proyek berdasarkan ID
exports.getProjectById = async (req, res) => {
    const projectId = req.params.id;

    try {
        const result = await pool.query(`SELECT * FROM projects WHERE id = $1`, [projectId]);

        if(result.rows.length == 0) throw new Error('Project Not Found');

        res.status(200).json(result.rows[0]); // Mengembalikan data proyek yang ditemukan
    } 
    
    catch (error) {
        console.error('Error getting project by ID:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.finishProject = async (req, res) => {
    const id = req.params.id;

    try {
        const update = await pool.query(`UPDATE projects 
            SET status = 'CLOSED', progress = 'DONE', ended_at = CURRENT_TIMESTAMP 
            WHERE id = $1 RETURNING *`, [id]);

        const ownerId = update.rows[0].owner_id;

        const collaborators = await pool.query(`SELECT user_id FROM collaborators WHERE project_id = $1`, [id]);

        const collaboratorsList = collaborators.rows;
        
        let values = [];
        for(let index in collaboratorsList) {
            let val = [id, collaboratorsList[index].user_id, ownerId];
            values.push(val);
        }

        const result = await pool.query(`INSER INTO ratings (project_id, user_id, reviewer_id) VALUES ?`, [values]);

        res.status(200).json(result.rows[0]); // Mengembalikan data proyek yang ditemukan
    } 
    
    catch (error) {
        console.error('Error getting project by ID:', error);
        res.status(400).json({ error: error.message });
    }
}

// Controller untuk memperbarui proyek berdasarkan ID
exports.updateProjectById = async (req, res) => {
    const projectId = req.params.id;
    const { title, description, status, progress } = req.body;

    try {
        const result = await pool.query(`UPDATE projects SET title = $1, description = $2, 
            status = $3, progress = $4 WHERE id = $5 RETURNING *`, [title, description, status, progress, projectId]);
        res.status(200).json(result.rows[0]); // Mengembalikan data proyek yang telah diperbarui
    } 
    
    catch (error) {
        console.error('Error updating project by ID:', error);
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk menghapus proyek berdasarkan ID
exports.deleteProjectById = async (req, res) => {
    const projectId = req.params.id;

    try {
        await pool.query(`DELETE FROM projects WHERE id = $1 AND progress <> 'DONE'`, [projectId]);
        res.status(204).json()
    } 
    
    catch (error) {
        console.error('Error deleting project by ID:', error);
        res.status(400).json({ error: error.message });
    }
};

