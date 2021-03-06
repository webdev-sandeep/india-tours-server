import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/user.js'
import tourRouter from './routes/tour.js'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

app.use(morgan('dev'))
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cors())

app.use('/users',userRouter)
app.use('/tour',tourRouter)

app.get('/',(req,res)=>{
    res.send('Welcome to the API!')
})



mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT || 5000,'0.0.0.0',()=>console.log(`Listening to the server at : http://localhost:${process.env.PORT || 5000}`))
    })
    .catch((error)=>console.log(error))