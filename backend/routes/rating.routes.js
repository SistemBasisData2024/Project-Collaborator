const express = require('express');
const router = express.Router();

const RatingController = require('../controllers/rating.controller');

// Rating routes
router.put('/:id', RatingController.createRating);

router.get('/sent/:user_id', RatingController.getAllRatingsByUser);
router.get('/received/:user_id', RatingController.getAllRatingsForUser);

module.exports = router;