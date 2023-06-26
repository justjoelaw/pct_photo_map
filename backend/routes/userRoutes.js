import express from 'express';
import * as usersController from '../controllers/userController.js';
import verifyJWTIfRequired from './verifyJWTIfRequired.js';

const router = express.Router();
router.use(verifyJWTIfRequired);

router.route('/').get(usersController.getAllUsers);
router.route('/').post(usersController.createNewUser);
router.route('/').patch(usersController.updateUser);
router.route('/').delete(usersController.deleteUser);

export default router;
