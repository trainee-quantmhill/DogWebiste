
import express from 'express';

//components
import userAuth from '../middlewares/auth.middleware.js'
import supplementController from '../controller/supplement.controller.js';
import { Upload } from '../middlewares/multer.middleware.js';

const router = express.Router();


router.post('/addSupplement',userAuth,Upload.single('file'),supplementController.addSupplement);


router.get('/getAllSupplement',userAuth,supplementController.getAllSupplement);


router.get('/getSupplementById/:id',userAuth,supplementController.getSupplementById);


router.patch('/updateSupplementById/:id',userAuth,supplementController.updateSupplementById);


router.delete('/deleteSupplementById/:id',userAuth,supplementController.deleteSupplementById);


export default router;