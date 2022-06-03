import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{type:String},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:false},
    googleId:{type:String,required:false},
})

export default mongoose.model('User',userSchema)