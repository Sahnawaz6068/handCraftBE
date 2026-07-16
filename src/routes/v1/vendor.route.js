import express from 'express';

import vendorController from '../../controller/vendor.controller.js';

const router = express.Router();

//api/v1/vendor/
router.get('/',vendorController.AllSubOrder);
router.delete('/:id',vendorController.deleteSubOrder);
router.patch('/:id',vendorController.updateOrderStatus);



export default router;