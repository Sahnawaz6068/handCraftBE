import express from 'express';
import userController from '../../controller/user.controllers.js';

const router = express.Router();

router.post('/',userController.createUser);

export default router;