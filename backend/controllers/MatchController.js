const Match = require('../models/Match');

// Controller untuk menambahkan match baru
exports.createMatch = async (req, res) => {
    try {
        const { user_id, potential_collaborator_id, match_score } = req.body;
        const newMatch = await Match.addMatch({
            user_id,
            potential_collaborator_id,
            match_score
        });
        res.status(201).json(newMatch);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua match
exports.getAllMatches = async (req, res) => {
    try {
        const matches = await Match.getAllMatches();
        res.status(200).json(matches);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan match berdasarkan ID
exports.getMatchById = async (req, res) => {
    try {
        const matchId = req.params.id;
        const match = await Match.getMatchById(matchId);
        if (match) {
            res.status(200).json(match);
        } else {
            res.status(404).json({ error: 'Match not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk memperbarui match berdasarkan ID
exports.updateMatchById = async (req, res) => {
    try {
        const matchId = req.params.id;
        const { user_id, potential_collaborator_id, match_score } = req.body;
        const updatedMatch = await Match.updateMatchById(matchId, {
            user_id,
            potential_collaborator_id,
            match_score
        });
        res.status(200).json(updatedMatch);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk menghapus match berdasarkan ID
exports.deleteMatchById = async (req, res) => {
    try {
        const matchId = req.params.id;
        await Match.deleteMatchById(matchId);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
