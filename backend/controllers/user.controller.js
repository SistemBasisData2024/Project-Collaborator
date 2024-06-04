const pool = require('../config/database');
const { BaseApiResponse } = require('../config/utils');

// Controller untuk membuat pengguna baru
exports.register = async (req, res) => {
    const { name, email, password } =  req.body;

    try {
        const result = await pool.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
             RETURNING *`, 
             [name, email, password]
            );

        res.status(200).json(BaseApiResponse('Succesfully Create User', result.rows[0]));
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(error.message, null);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [email, password]);

        if(result.rows.length == 0) 
            return res.status(404).json(BaseApiResponse('User Not Found', null));
        
        return res.status(200).json(BaseApiResponse("Login Succesful", result.rows[0])); // Mengembalikan data user yang baru ditambahkan
    } 
    
    catch (error) {
        console.log(error);
        return res.status(500).json(BaseApiResponse(error.message, null));
    }
}

exports.getAvailableCollaborator = async (req, res) => {
    try{
        const result = await pool.query(`SELECT * FROM users WHERE open_to_work = TRUE`);
        return res.status(200).json(BaseApiResponse("Successfully get users", result.rows)); 
    }

    catch(error){
        console.log(error);
        return res.status(500).json(BaseApiResponse(error.message, null));
    }
}

// Controller untuk mendapatkan pengguna berdasarkan ID
exports.getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

        if(result.rows.length == 0) 
            return res.status(404).json(BaseApiResponse('User Not Found', null));

        return res.status(200).json(BaseApiResponse("Succesfully get user", result.rows[0])); // Mengembalikan data user yang ditemukan
    } 
    
    catch (error) {
        console.log(error);
        return res.status(500).json(BaseApiResponse(error.message, null));
    }
};

// Controller untuk memperbarui pengguna berdasarkan ID
exports.updateUserById = async (req, res) => {
    const id = req.params.id;
    const { name, profile_picture, bio, open_to_work } = req.body;

    try {
        const result = await pool.query( `UPDATE users SET name = $1, 
            profile_pic = $2, bio = $3, open_to_work = $4
            WHERE id = $5 RETURNING *`, [name, profile_picture, bio, open_to_work, id]);

        if(result.rows.length == 0)
            return res.status(404).json(BaseApiResponse('User Not Found', null));
        
        return res.status(200).json(BaseApiResponse("Succesfully update user", result.rows[0])); // Mengembalikan data user yang telah diperbarui
    } 
    
    catch (error) {
        console.log(error);
        return res.status(500).json(BaseApiResponse(error.message, null));
    }
};

// Controller untuk menghapus pengguna berdasarkan ID
exports.deleteUserById = async (req, res) => {
    const id  = req.params.id;

    try {
        await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
        return res.status(200).json(BaseApiResponse("Sucessfully deleted user", null));
    } 
    
    catch (error) {
        console.log(error);
        return res.status(500).json(BaseApiResponse(error.message, null));
    }
};
