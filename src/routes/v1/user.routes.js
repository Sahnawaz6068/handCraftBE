import express from 'express';
import userController from '../../controller/user.controllers.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

router.post('/',userController.createUser);
router.get('/',auth,userController.getAllUser);
router.get('/:id',auth,userController.getUser);

export default router;