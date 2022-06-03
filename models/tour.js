import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    title:String,
    description:String,
    name:String,
    creator:String,
    tags:[String],
    image:String,
    createdAt:{
        type:Date,
        default:new Date()
    },
    likes:{
        type:[String],
        default:[]
    }
})

export default mongoose.model('Tour',tourSchema)