const express = require('express');
const router = express.Router();

const ApplicationController = require('../controllers/application.controller');

// Application routes
router.post('/', ApplicationController.createApplication);

router.get('/user/:user_id', ApplicationController.getAllApplicationByUserId);
router.get('/owner/:user_id', ApplicationController.getAllApplicationByOwnerId);

router.put('/accept/:id', ApplicationController.acceptApplication);
router.put('/reject/:id', ApplicationController.rejectApplication);

router.delete('/:id', ApplicationController.deleteApplicationById);

module.exports = router;