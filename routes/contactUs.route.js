import express from 'express';

//components
import userAuth from '../middlewares/auth.middleware.js'
import contactUsController from '../controller/contact.controller.js';



const router = express.Router();


router.post('/contact',userAuth,contactUsController.sendMessage);


//GET   ||  Messsage
router.get('/seeMessageByAdmin',contactUsController.seeMessage);

export default router;