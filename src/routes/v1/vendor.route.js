// vendor get profile 
// update profile logo name and other data

// vendor can apply for becoming vendor
//

import express from 'express';
import vendorController from '../../controller/vendor.controller.js';
import auth from "../../middleware/auth.js";
import restrictTo from "../../middleware/role.js"

const router = express.Router();
//this does not create a new, it triggers a state transition
router.post('/apply',auth,restrictTo("customer"),vendorController.applyForVendor);
router.get('/profile',auth,restrictTo("vendor"),vendorController.getMyProfile);
// router.patch('/:id',);

//admin do operation to vendor account
// router.get('/vendor/pending',);
// router.patch('/vendor/:vendorId/approve',)
// router.patch()

export default router;