import express from 'express';

import controller from '../../controller/product.controllers.js';

const router = express.Router();

//api/v1/product/
router.get('/:id',controller.getProductById);
router.get('/',controller.getAllProduct);
router.post('/',controller.createProduct);
router.delete('/:id',controller.deleteProductById);
router.patch('/:id',controller.updateProductById);


export default router;