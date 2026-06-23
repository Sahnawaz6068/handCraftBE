import express from 'express';

import product from './product.routes.js'
import user from './user.routes.js'

const router = express.Router();

router.use('/product',product);
router.use('/user',user);

export default router;