import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/user.js'
import tourRouter from './routes/tour.js'
import dotenv from 'dotenv'

const app = express()
const port = process.env.PORT || 5000
dotenv.config()

app.use(morgan('dev'))
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cors())

app.use('/users',userRouter)
app.use('/tour',tourRouter)

app.get('/',(req,res)=>{
    res.send(`<h1>Welcome to the API!</h1>`)
})



mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(port,()=>console.log(`Listening to the server at : http://localhost:${port}`))
    })
    .catch((error)=>console.log(error))