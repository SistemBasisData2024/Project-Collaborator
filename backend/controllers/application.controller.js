const pool = require("../config/database");
const { BaseApiResponse, ApplicationOwnerResponse, ApplicationUserResponse } = require("../config/utils");

// Controller untuk menambahkan aplikasi baru
exports.createApplication = async (req, res) => {
    const { project_id, user_id, role } = req.body;

    try {
        const result = await pool.query(`INSERT INTO applications (project_id, user_id, role)
            VALUES ($1, $2, $3) RETURNING *`, [project_id, user_id, role]);
        res.status(200).json(BaseApiResponse('Successfully create application', result.rows[0])); // Mengembalikan data aplikasi yang baru ditambahkan
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null));
    }
};

// Controller untuk mendapatkan aplikasi berdasarkan ID
exports.getAllApplicationByOwnerId = async (req, res) => {
    const id = req.params.user_id;

    try {
        const data = await pool.query(`SELECT applications.id, applications.status, applications.role, projects.name AS project_name, projects.id AS project_id,
            users.id AS user_id, users.name AS user_name, users.email FROM applications 
            INNER JOIN projects ON applications.project_id = projects.id 
            INNER JOIN users ON users.id = applications.user_id
            WHERE projects.owner_id = $1
            `, [id]);

        let result = [];
        for(let i = 0; i < data.rows.length; i++){
            let temp = ApplicationOwnerResponse(data.rows[i]);
            result.push(temp);
        }
        
        res.status(200).json(BaseApiResponse('Successfully get applications', result)); // Mengembalikan data aplikasi yang ditemukan
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null));
    }
};

exports.getAllApplicationByUserId = async(req, res) => {
    const id = req.params.user_id;

    try {
        const data = await pool.query(`SELECT applications.id, applications.status, projects.name, projects.description, projects.id AS project_id
            FROM applications INNER JOIN projects ON applications.project_id = projects.id WHERE user_id = $1`, [id]);

        let result = [];
        for(let i = 0; i < data.rows.length; i++){
            let temp = ApplicationUserResponse(data.rows[i]);
            result.push(temp);
        }

        res.status(200).json(BaseApiResponse('Successfully get applications', result)); // Mengembalikan data aplikasi yang ditemukan
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null));
    }
}

exports.acceptApplication = async(req, res) => {
    const id = req.params.id;

    try{
        const result = await pool.query(`UPDATE applications SET status = 'ACCEPTED' WHERE id = $1 RETURNING *`, [id]);
        res.status(200).json(BaseApiResponse('Succesfully accepting user applicaitons', result.rows[0]));
    }

    catch(error){
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null));
    }
}

exports.rejectApplication = async(req, res) => {
    const id = req.params.id;

    try{
        const result = await pool.query(`UPDATE applications SET status = 'REJECTED' WHERE id = $1 RETURNING *`, [id]);
        res.status(200).json(BaseApiResponse('Successfully rejecting user applications', result.rows[0]));
    }

    catch(error){
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null));
    }
}

// Controller untuk menghapus aplikasi berdasarkan ID
exports.deleteApplicationById = async (req, res) => {
    const applicationId = req.params.id;

    try {
        await pool.query(`DELETE FROM applications WHERE id = $1`, [applicationId]);
        res.status(200).json();
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null));
    }
};
