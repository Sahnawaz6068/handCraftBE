import express from 'express';

import product from './product.routes.js'
import user from './auth.routes.js'
import cart from './cart.routes.js'

const router = express.Router();

router.use('/products',product);
router.use('/s',cart)
router.use('/user',user);

export default router;