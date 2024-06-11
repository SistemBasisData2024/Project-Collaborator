const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

// User routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.get('/', UserController.getAvailableCollaborator);
router.get('/:id', UserController.getUserById);

router.put('/profile/:id', UserController.updateUserProfileInfo);
router.put('/login/:id', UserController.updateUserLoginInfo);

router.delete('/:id', UserController.deleteUserById);

module.exports = router;