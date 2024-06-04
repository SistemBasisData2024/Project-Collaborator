const pool = require("../config/database");

// Controller untuk menambahkan aplikasi baru
exports.createApplication = async (req, res) => {
    const { project_id, user_id, role } = req.body;

    try {
        const result = await pool.query(`INSERT INTO applications (project_id, user_id, role)
            VALUES ($1, $2, $3) RETURNING *`, [project_id, user_id, role]);
        res.status(201).json(result.rows[0]); // Mengembalikan data aplikasi yang baru ditambahkan
    } 
    
    catch (error) {
        console.error('Error adding application:', error);
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan aplikasi berdasarkan ID
exports.getAllApplicationByOwnerId = async (req, res) => {
    const id = req.params.user_id;

    try {
        const result = await pool.query(`SELECT applications.id, applications.project_id, applications.user_id, applications.role 
            FROM applications INNER JOIN projects ON applications.project_id = projects.id WHERE projects.owner_id = $1`, [id]);

        res.status(200).json(result.rows); // Mengembalikan data aplikasi yang ditemukan
    } 
    
    catch (error) {
        console.error('Error getting application by ID:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.getAllApplicationByUserId = async(req, res) => {
    const id = req.params.user_id;

    try {
        const result = await pool.query(`SELECT * FROM applications WHERE user_id = $1`, [id]);

        if(result.rows.length == 0) throw new Error('User never applied');

        res.status(200).json(result.rows); // Mengembalikan data aplikasi yang ditemukan
    } 
    
    catch (error) {
        console.error('Error getting application by ID:', error);
        res.status(400).json({ error: error.message });
    }
}

exports.acceptApplication = async(req, res) => {
    const id = req.params.id;

    try{
        const result = await pool.query(`UPDATE applications SET status = 'ACCEPTED' WHERE id = $1 RETURNING *`, [id]);
        res.status(200).json(result.rows[0]);
    }

    catch(error){
        console.error('Error accepting application by ID:', error);
        res.status(400).json({ error: error.message });
    }
}

exports.rejectApplication = async(req, res) => {
    const id = req.params.id;

    try{
        const result = await pool.query(`UPDATE applications SET status = 'REJECTED' WHERE id = $1 RETURNING *`, [id]);
        res.status(200).json(result.rows[0]);
    }

    catch(error){
        console.error('Error accepting application by ID:', error);
        res.status(400).json({ error: error.message });
    }
}

// Controller untuk menghapus aplikasi berdasarkan ID
exports.deleteApplicationById = async (req, res) => {
    const applicationId = req.params.id;

    try {
        await pool.query(`DELETE FROM applications WHERE id = $1`, [applicationId]);
        res.status(204).json();
    } 
    
    catch (error) {
        console.error('Error deleting application by ID:', error);
        res.status(400).json({ error: error.message });
    }
};
