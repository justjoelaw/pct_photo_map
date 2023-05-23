const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController.js');

router.route('/').get(usersController.getAllUsers);
router.route('/').post(usersController.createNewUser);
router.route('/').patch(usersController.updateUser);
router.route('/').delete(usersController.deleteUser);

module.exports = router;
