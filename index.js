import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js'
import userRouter from './Routes/user.js'
import doctorRouter from './Routes/doctor.js'
import reviewRouter from './Routes/review.js'
import bookingRoute from './Routes/booking.js'
// import Stripe from 'stripe'

dotenv.config()
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const app = express();
const port = process.env.PORT || 8000

const corsOptions = {
    origin: true,
}

app.get('/', (req, res)=>{
    res.send('Api is working')
})

//db connection
mongoose.set('strictQuery', false)
const connedDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL, {

        })
        console.log('Db is connected')
    }catch(err){
        console.log('Db is connected error')
    }
}

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRouter) 
app.use('/api/v1/doctors', doctorRouter) 
app.use('/api/v1/reviews', reviewRouter) 
app.use('/api/v1/bookings', bookingRoute) 


app.listen(port, () =>{
    connedDB()
    console.log('Server is runing ', port);
})