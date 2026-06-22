import express from 'express';

import product from './product.routes.js'

const router = express.Router();

router.use('/product',product);

export default router;