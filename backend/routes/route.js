const express = require('express');
const router = express.Router();

// Import controllers
const UserController = require('../controllers/UserController');
const ProjectController = require('../controllers/ProjectController');
const ExperienceController = require('../controllers/ExperienceController');
const ApplicationController = require('../controllers/ApplicationController');
const RatingController = require('../controllers/RatingController');
const MessageController = require('../controllers/MessageController');
const MatchController = require('../controllers/MatchController');

// User routes
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUserById);
router.delete('/users/:id', UserController.deleteUserById);

// Project routes
router.post('/projects', ProjectController.createProject);
router.get('/projects', ProjectController.getAllProjects);
router.get('/projects/:id', ProjectController.getProjectById);
router.put('/projects/:id', ProjectController.updateProjectById);
router.delete('/projects/:id', ProjectController.deleteProjectById);

// Experience routes
router.post('/experiences', ExperienceController.createExperience);
router.get('/experiences', ExperienceController.getAllExperiences);
router.get('/experiences/:id', ExperienceController.getExperienceById);
router.put('/experiences/:id', ExperienceController.updateExperienceById);
router.delete('/experiences/:id', ExperienceController.deleteExperienceById);

// Application routes
router.post('/applications', ApplicationController.createApplication);
router.get('/applications', ApplicationController.getAllApplications);
router.get('/applications/:id', ApplicationController.getApplicationById);
router.put('/applications/:id', ApplicationController.updateApplicationById);
router.delete('/applications/:id', ApplicationController.deleteApplicationById);

// Rating routes
router.post('/ratings', RatingController.createRating);
router.get('/ratings', RatingController.getAllRatings);
router.get('/ratings/:id', RatingController.getRatingById);
router.put('/ratings/:id', RatingController.updateRatingById);
router.delete('/ratings/:id', RatingController.deleteRatingById);

// Message routes
router.post('/messages', MessageController.createMessage);
router.get('/messages', MessageController.getAllMessages);
router.get('/messages/:id', MessageController.getMessageById);
router.put('/messages/:id', MessageController.updateMessageById);
router.delete('/messages/:id', MessageController.deleteMessageById);

// Match routes
router.post('/matches', MatchController.createMatch);
router.get('/matches', MatchController.getAllMatches);
router.get('/matches/:id', MatchController.getMatchById);
router.put('/matches/:id', MatchController.updateMatchById);
router.delete('/matches/:id', MatchController.deleteMatchById);

module.exports = router;
