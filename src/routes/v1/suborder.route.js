import express from 'express';

import vendorController from '../../controller/suborder.controller.js';
//SubOrder controller 
const router = express.Router();

//api/v1/vendor/
// router.get('/',vendorController.AllSubOrder); this route is for admin pupous\\\
router.get('/:vendorid',vendorController.AllSubOrders);
router.delete('/:id',vendorController.deleteSubOrder);
router.patch('/:id',vendorController.updateOrderStatus);
//logical breakdown here is some feature lack using vendor id i get all the suborder
//It is needed for the vendor and admin also because vendor need to view manage
//Admin also need to view the suborder of each vendor 
//So i shoud share it in the body (vendorid not in the param )
//Here the patcha and delete is using suborderId

export default router;