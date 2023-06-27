import express from 'express';
import * as trailsController from '../controllers/trailController.js';
import verifyJWTIfRequired from './verifyJWTIfRequired.js';

const router = express.Router();
router.use(verifyJWTIfRequired);

router.route('/').get(trailsController.getAllTrails);
router.route('/').post(trailsController.createNewTrail);
router.route('/').patch(trailsController.updateTrail);
router.route('/').delete(trailsController.deleteTrail);

export default router;
