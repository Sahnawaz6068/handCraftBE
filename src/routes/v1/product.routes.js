import express from 'express';

import controller from '../../controller/product.controllers.js';

const router = express.Router();

//api/v1/product/
router.get('/:id',controller.getProductById);
router.get('/',controller.getProducts); // pagination query
router.get('/',controller.getAllProduct); //


//This is done by the vendor (Autorized by the vendor)
router.post('/',controller.createProduct);
router.delete('/:id',controller.deleteProductById);
router.patch('/:id',controller.updateProductById);


export default router;