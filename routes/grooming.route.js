import express from 'express';

//components
import userAuth from '../middlewares/auth.middleware.js'
import groomingController from '../controller/grooming.controller.js';
import { Upload } from '../middlewares/multer.middleware.js';

const router = express.Router();


router.post('/addGrooming',userAuth,Upload.single('file'),groomingController.addGrooming);


router.get('/getAllGrooming',userAuth,groomingController.getAllGrooming);


router.get('/getGroomingById/:id',userAuth,groomingController.getGroomingById);


router.patch('/updateGroomingById/:id',userAuth,groomingController.updateGroomingById);


router.delete('/deleteGroomingById/:id',userAuth,groomingController.deleteGroomingById);


export default router;