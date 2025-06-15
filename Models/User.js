import mongoose from "mongoose"; 
const userSchema = new mongoose.Schema({
    name: {type:String, requires:true},
    email: {type:String, requires:true},
    password: {type:String, requires:true},
    createdAt: {type:Date,default:Date.now},
})
export const User = mongoose.model("User", userSchema)