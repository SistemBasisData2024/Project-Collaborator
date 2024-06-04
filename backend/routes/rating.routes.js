const express = require('express');
const router = express.Router();

const RatingController = require('../controllers/rating.controller');

// Rating routes
router.put('/:id', RatingController.createRating);

router.get('/:user_id', RatingController.getAllRatingsByUser);

module.exports = router;