import express from 'express';

//components
import userAuth from '../middlewares/auth.middleware.js'
import bowlsController from '../controller/bowls.controller.js';
import { Upload } from '../middlewares/multer.middleware.js';

const router = express.Router();


router.post('/addBowls',userAuth,Upload.single('file'),bowlsController.addbowls);


router.get('/getAllBowls',userAuth,bowlsController.getAllbowls);


router.get('/getBowlsById/:id',userAuth,bowlsController.getbowlsById);


router.patch('/updateBowlsById/:id',userAuth,bowlsController.updatebowlsById);


router.delete('/deleteBowlsById/:id',userAuth,bowlsController.deletebowlsById);


export default router;