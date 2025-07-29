import express from 'express'
import mongoose from 'mongoose';
//import bodyParser from 'express';
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import paymentRouter from './Routes/payment.js'

import cors from 'cors';


const app = express();
app.use(express.json());

app.use(cors({
    origin:['http://localhost:5173',
     'https://www.nandniraj.in'   
    ],
    methods:["GET" , "POST" , "PUT" , "DELETE"],
    credentials:true
}))




//home testing 

app.get('/',(req,res)=> res.json({message:'This is home route'}))
//user Router
app.use('/api/user',userRouter)

//product router
app.use('/api/product', productRouter)

//cart router
app.use('/api/cart', cartRouter)

//address router 
app.use('/api/address', addressRouter)

// payment Router
app.use('/api/payment', paymentRouter)

mongoose.connect(
    "mongodb+srv://ksapan73:Kr8f4qJTTkzd5XiK@cluster0.gt8sy.mongodb.net/",{
        dbName:"MERN_PROJECT"
    }
).then(() =>console.log("Mongodb is connected....!")).catch((error)=>console.log(error)
)

const port = 1000;

app.listen(port,() =>console.log(`Server is running ${port}`))