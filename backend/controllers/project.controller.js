const pool = require('../config/database');
const { BaseApiResponse, ProjectDetailResponse } = require('../config/utils');

// Controller untuk membuat proyek baru
exports.createProject = async (req, res) => {
    const { name, description, owner_id, status } = req.body;

    try {
        const result = await pool.query(`INSERT INTO projects (name, description, owner_id, status)
                VALUES ($1, $2, $3, $4)
                RETURNING *`, [name, description, owner_id, status]);

        res.status(201).json(BaseApiResponse('Successfully created projects', result.rows[0])); // Mengembalikan data proyek yang baru ditambahkan
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null));
    }
};

// Controller untuk mendapatkan semua proyek
exports.getAllOpenProjects = async (req, res) => {
    try {
        const result = await pool.query(`SELECT projects.id, projects.name as project_name, projects.description, users.name as user_name, users.email 
            FROM projects INNER JOIN users ON projects.owner_id = users.id
            WHERE status = 'OPEN'`);
        res.status(200).json(BaseApiResponse('Successfully get all open projects', result.rows)); // Mengembalikan semua data proyek
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null));
    }
};

exports.getUserRunningProjects = async (req, res) => {
    const id = req.params.user_id;

    try{
        let result = [];
        let query = await pool.query(`SELECT * FROM projects WHERE owner_id = $1 
            AND progress = 'RUNNING'`, [id]);
        result = result.concat(query.rows);

        query = await pool.query(`SELECT projects.id, projects.name, projects.description, projects.description, projects.owner_id,
            projects.status, projects.progress, projects.started_at, projects.ended_at FROM projects INNER JOIN collaborators 
            ON projects.id = collaborators.project_id WHERE collaborators.user_id = $1 AND progress = 'RUNNING'`, [id]);
        result = result.concat(query.rows);
        
        res.status(200).json(BaseApiResponse('Succesfully get user running projects', result));
    }

    catch(error){
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null));
    }
}

exports.getUserProjects = async (req, res) => {
    const id = req.params.user_id;

    try{
        const result = await pool.query(`SELECT * FROM projects WHERE owner_id = $1`, [id]);

        res.status(200).json(BaseApiResponse('Successfully get all user project', result.rows));
    }

    catch(error){
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null ));
    }
}

exports.getUserExperiences = async (req, res) => {
    const id = req.params.user_id;

    try {
        const result = await pool.query(`SELECT * FROM projects WHERE (owner_id = $1 
                OR id = (
                    SELECT project_id FROM collaborators WHERE user_id = $1
                )) AND progress = 'DONE'`, [id]);
        res.status(200).json(BaseApiResponse('Successfully get experiences', result.rows)); // Mengembalikan semua data proyek
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null ));
    }
}

// Controller untuk mendapatkan proyek berdasarkan ID
exports.getProjectById = async (req, res) => {
    const projectId = req.params.id;

    try {
        let data = await pool.query(`SELECT * FROM projects WHERE id = $1`, [projectId]);

        if(data.rows.length == 0) 
            return res.status(404).json(BaseApiResponse('Project Not Found', null));
        
        const projectData = data.rows[0];
        
        data = await pool.query('SELECT * FROM users WHERE id = $1', [projectData.owner_id]);
        const userData = data.rows[0];

        data = await pool.query(`SELECT users.id AS id, users.name AS name, users.profile_pic AS profile_pic, collaborators.role AS role
            FROM collaborators INNER JOIN users on collaborators.user_id = users.id WHERE project_id = $1`, [projectData.id]);
        const collaboratorsData = data.rows;

        const result = ProjectDetailResponse(projectData, userData, collaboratorsData);

        res.status(200).json(BaseApiResponse('Successfully get project', result)); // Mengembalikan data proyek yang ditemukan
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null ));
    }
};

exports.finishProject = async (req, res) => {
    const id = req.params.id;

    try {
        const update = await pool.query(`UPDATE projects 
            SET status = 'CLOSED', progress = 'DONE', ended_at = CURRENT_TIMESTAMP 
            WHERE id = $1 RETURNING *`, [id]);

        if(update.rows.length == 0)
            return res.status(404).json(BaseApiResponse('Project Not Found', null));

        const ownerId = update.rows[0].owner_id;

        const collaborators = await pool.query(`SELECT user_id FROM collaborators WHERE project_id = $1`, [id]);

        const collaboratorsList = collaborators.rows;
        
        let query = `INSERT INTO ratings (project_id, user_id, reviewer_id) VALUES `

        for(let i = 0; i < collaboratorsList.length; i++){
            console.log(collaboratorsList[i]);

            if(i < collaboratorsList.length - 1){
                query += `(${id}, ${collaboratorsList[i].user_id}, ${ownerId}), `;
            }
            else {
                query += `(${id}, ${collaboratorsList[i].user_id}, ${ownerId})`;
            }
        }

        console.log(query);
        await pool.query(query);

        res.status(200).json(BaseApiResponse('Successfully ended project', null)); // Mengembalikan data proyek yang ditemukan
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null ));
    }
}

// Controller untuk memperbarui proyek berdasarkan ID
exports.updateProjectById = async (req, res) => {
    const projectId = req.params.id;
    const { name, description, status } = req.body;

    try {
        const result = await pool.query(`UPDATE projects SET name = $1, description = $2, 
            status = $3 WHERE id = $4 RETURNING *`, [name, description, status, projectId]);
        
        if(result.rows.length == 0)
            return res.status(404).json(BaseApiResponse('Project Not Found', null));

        res.status(200).json(BaseApiResponse('Successfully Update project', result.rows[0])); // Mengembalikan data proyek yang telah diperbarui
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null ));
    }
};

// Controller untuk menghapus proyek berdasarkan ID
exports.deleteProjectById = async (req, res) => {
    const projectId = req.params.id;

    try {
        const result = await pool.query(`DELETE FROM projects WHERE id = $1 AND progress <> 'DONE' RETURNING *`, [projectId]);
        
        if(result.rows.length == 0) throw new Error('Projects is not valid to delete');

        res.status(200).json(BaseApiResponse('Successfully Delete Project', null))
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null ));
    }
};

