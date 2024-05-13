import express from 'express';

//components
import userAuth from '../middlewares/auth.middleware.js'
import foodController from '../controller/food.controller.js';
import { Upload } from '../middlewares/multer.middleware.js';

const router = express.Router();


router.post('/addFood',userAuth,Upload.single('file'),foodController.addFood);


router.get('/getAllFoods',userAuth,foodController.getAllFoods);


router.get('/getFoodById/:id',userAuth,foodController.getFoodById);


router.patch('/updateFoodById/:id',userAuth,foodController.updateFoodById);


router.delete('/deleteFoodById/:id',userAuth,foodController.deleteFoodById);


export default router;