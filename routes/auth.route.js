import express from 'express';

const router = express.Router();

//components
import authController from '../controller/auth.controller.js';
import userAuth from '../middlewares/auth.middleware.js';



//Registration   || POST
router.post('/register', authController.userRegistration);


//Login   || POST
router.post('/login',authController.userLogin);


//Click Profile
// router.get('/getProfile',userAuth,authController.getUserProfile);


// //Change Password
// router.patch('/updateProfile',userAuth,authController.updateUserProfile);



export default router;