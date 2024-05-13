 

// packages imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; //use to run of frontend and backend on same server
import morgan from 'morgan'; //morgan is used to give api related information(request name,time,url...);
 

//components
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
import contactRoutes from './routes/contactUs.route.js'
import foodRoutes from './routes/food.route.js';
import supplementRoutes from './routes/supplement.route.js';
import bowlsRoutes from './routes/bowls.routes.js';
import treetsRoutes from './routes/treets.route.js';
import groomingRoutes from './routes/grooming.route.js';




//Security Packages
import helmet from 'helmet'; //used to security purpose 
import xss from 'xss-clean'; //used to protect the requests(POST,GET,PATCH etc)
import mongoSanitize from 'express-mongo-sanitize'; //used for security purpose for mongodb and express server .

//config dotenv
dotenv.config();

//mongodb connectDB
connectDB();

 

 
const app = express()

//middleware
app.use(helmet());   
app.use(xss());   
app.use(mongoSanitize()); 
app.use(express.json());  //conver the data which comes from client in json form.
app.use(cors()); 
app.use(morgan("dev"));


//routes

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',contactRoutes);
app.use('/api/v1/user/food',foodRoutes);
app.use('/api/v1/user/supplement',supplementRoutes);
app.use('/api/v1/user/bowls',bowlsRoutes);
app.use('/api/v1/user/treets',treetsRoutes);
app.use('/api/v1/user/grooming',groomingRoutes);
 

//PORT
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT,()=>{
    console.log(`Node Running In Node at ${PORT}`);
})