import express from 'express';

import controller from '../../controller/product.controllers.js';

const router = express.Router();

//api/v1/product/
router.get('/',controller.getProduct);
router.get('/2',controller.getProduct2);


export default router;