import express from 'express';

//components
import userAuth from '../middlewares/auth.middleware.js'
import treetsController from '../controller/treets.controller.js';
import { Upload } from '../middlewares/multer.middleware.js';

const router = express.Router();


router.post('/addTreets',userAuth,Upload.single('file'),treetsController.addTreets);


router.get('/getAllTreets',userAuth,treetsController.getAllTreets);


router.get('/getTreetsById/:id',userAuth,treetsController.getTreetsById);


router.patch('/updateTreetsById/:id',userAuth,treetsController.updateTreetsById);


router.delete('/deleteTreetsById/:id',userAuth,treetsController.deleteTreetsById);


export default router;