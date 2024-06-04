const pool = require('../config/database');

// Controller untuk membuat pengguna baru
exports.register = async (req, res) => {
    const { name, email, password } =  req.body;

    try {
        const result = await pool.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
             RETURNING *`, 
             [name, email, password]
            );

        res.status(201).json(result.rows[0]);
    } 
    
    catch (error) {
        console.error('Error adding user:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [email, password]);

        if(result.rows.length == 0) throw new Error('User not Exist');
        
        res.status(201).json(result.rows[0]); // Mengembalikan data user yang baru ditambahkan
    } 
    
    catch (error) {
        console.error('Error login user:', error);
        res.status(400).json({ error: error.message });
    }
}

exports.getAvailableCollaborator = async (req, res) => {
    try{
        const result = await pool.query(`SELECT * FROM users WHERE open_to_work = TRUE`);
        res.status(200).json(result.rows); 
    }

    catch(error){
        console.error('Error getting all user :', error);
        res.status(400).json({ error: error.message });
    }
}

// Controller untuk mendapatkan pengguna berdasarkan ID
exports.getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

        if(result.rows.length == 0) throw new Error('User Not Found');

        res.status(200).json(result.rows[0]); // Mengembalikan data user yang ditemukan
    } 
    
    catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk memperbarui pengguna berdasarkan ID
exports.updateUserById = async (req, res) => {
    const id = req.params.id;
    const { name, email, password, profile_picture, bio, open_to_work } = req.body;

    try {

        const result = await pool.query( `UPDATE users SET name = $1, email = $2, 
            password = $3, profile_picture = $4, bio = $5, open_to_work = $6
            WHERE id = $7 RETURNING *`, [name, email, password, profile_picture, bio, open_to_work, id]);

        res.status(200).json(result.rows[0]); // Mengembalikan data user yang telah diperbarui
    } 
    
    catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk menghapus pengguna berdasarkan ID
exports.deleteUserById = async (req, res) => {
    const id  = req.params.id;

    try {
        await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
        res.status(204).json();
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = exports;
