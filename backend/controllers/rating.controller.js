// controllers/RatingController.js
const pool = require("../config/database");
const { BaseApiResponse } = require("../config/utils");

// Controller untuk membuat penilaian baru
exports.createRating = async (req, res) => {
    const id = req.params.id;
    const { rating, review } = req.body;

    try {
        const result = await pool.query(`UPDATE ratings SET rating = $1, review = $2 WHERE id = $3`, [rating, review, id]);
        
        res.status(201).json(BaseApiResponse('Successfully created rating', result.rows[0])); // Mengembalikan data rating yang baru ditambahkan
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null ));
    }
};

// Controller untuk mendapatkan semua penilaian
exports.getAllRatingsByUser = async (req, res) => {
    const id = req.params.user_id;

    try {
        const data = await pool.query(`SELECT ratings.id AS rating_id, ratings.rating, ratings.review, ratings.status, projects.id AS project_id, projects.name AS project_name,
            users.id AS user_id, users.name AS user_name, users.profile_pic, collaborators.role FROM ratings 
            INNER JOIN users ON ratings.user_id = users.id
            INNER JOIN projects ON ratings.project_id = projects.id
            INNER JOIN collaborators ON ratings.user_id = collaborators.user_id
            WHERE ratings.reviewer_id = $1`, [id]);

        let result = [];
        for(let i = 0; i < data.rows.length; i++){
            let temp = {
                id: data.rows[i].rating_id,
                rating: data.rows[i].rating,
                review: data.rows[i].review,
                status: data.rows[i].status,
                project: {
                    id: data.rows[i].project_id,
                    name: data.rows[i].project_name
                },
                user: {
                    id: data.rows[i].user_id,
                    profile_pic: data.rows[i].profile_pic,
                    name: data.rows[i].user_name,
                    role: data.rows[i].role
                }
            }
            result.push(temp);
        }
        
        res.status(200).json(BaseApiResponse('Successfully get review by user', result)); // Mengembalikan semua data rating
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null ));
    }
};

exports.getAllRatingsForUser = async (req, res) => {
    const id = req.params.user_id

    try {
        const data = await pool.query(`SELECT ratings.rating, ratings.review, ratings.status, projects.id AS project_id, 
            projects.name AS project_name, users.id AS user_id, users.name AS user_name, users.profile_pic
            FROM ratings 
            INNER JOIN users ON ratings.reviewer_id = users.id
            INNER JOIN projects ON ratings.project_id = projects.id
            WHERE ratings.user_id = $1`, [id]);

        let result = [];
        for(let i = 0; i < data.rows.length; i++){
            let temp = {
                rating: data.rows[i].rating,
                review: data.rows[i].review,
                status: data.rows[i].status,
                project: {
                    id: data.rows[i].project_id,
                    name: data.rows[i].project_name
                },
                reviewer: {
                    id: data.rows[i].user_id,
                    profile_pic: data.rows[i].profile_pic,
                    name: data.rows[i].user_name
                }
            }
            result.push(temp);
        }

        res.status(200).json(BaseApiResponse('Successfully get review for user', result)); // Mengembalikan semua data rating
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(BaseApiResponse(error.message, null ));
    }
}
