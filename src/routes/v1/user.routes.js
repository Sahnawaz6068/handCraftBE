import express from 'express';
import userController from '../../controller/user.controllers.js';

const router = express.Router();

router.post('/',userController.createUser);
router.get('/',userController.getAllUser);

export default router;