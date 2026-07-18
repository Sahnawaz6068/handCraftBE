import express from 'express';

import product from './product.routes.js'
import user from './auth.routes.js'
import cart from './cart.routes.js'
import order from './order.routes.js'
import suborder from './suborder.route.js';
import otp from './otp.routes.js'
const router = express.Router();

router.use('/products',product);
router.use('/cart',cart)
router.use('/user',user);
router.use('/orders',order);
router.use('/suborder',suborder);
router.use('/otp',otp)

export default router;