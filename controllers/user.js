import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from '../models/user.js'

const secret = "test"

export const login = async(req,res) => {
    const {email,password} = req.body

    try {
        const oldUser = await UserModal.findOne({email})

        if(!oldUser){
            return res.status(404).json({message:'User doesn\'t exist!'})
        }

       const isPasswordCorrect = await bcrypt.compare(password,oldUser.password)

       if(!isPasswordCorrect){
           res.status(404).json({message:'Invalid credentials!'})
       }

        const token = await jwt.sign({email:oldUser.email,id:oldUser._id},secret,{expiresIn:'1h'})
        res.status(201).json({result:oldUser,token})
    } catch (error) {
        res.status(500).json({message:'Something went wrong!'})
        console.log(error)
    }
}

export const signup = async(req,res) => {
    const {firstName,lastName,email,password} = req.body

    try {
        const oldUser = await UserModal.findOne({email})

        if(oldUser){
            return res.status(400).json({message:'User already exist!'})
        }

        const hashPassword = await bcrypt.hash(password,12)
        const newUser = await UserModal.create({
            name:`${firstName} ${lastName}`,
            email,
            password:hashPassword,
        })

        const token = await jwt.sign({email:newUser.email,id:newUser._id},secret,{expiresIn:'1h'})
        res.status(201).json({newUser,token})
    } catch (error) {
        res.status(500).json({message:'Something went wrong!'})
        console.log(error)
    }
}