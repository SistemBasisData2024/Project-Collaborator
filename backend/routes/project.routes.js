const express = require('express');
const router = express.Router();

const ProjectController = require('../controllers/project.controller');

// Project routes
router.post('/', ProjectController.createProject);

router.get('/users/:user_id', ProjectController.getUserProjects)
router.get('/projects/:user_id', ProjectController.getUserRunningProjects);
router.get('/experiences/:user_id', ProjectController.getUserExperiences);
router.get('/', ProjectController.getAllOpenProjects);
router.get('/:id', ProjectController.getProjectById);

router.put('/finish/:id', ProjectController.finishProject);
router.put('/:id', ProjectController.updateProjectById);

router.delete('/:id', ProjectController.deleteProjectById);

module.exports = router;