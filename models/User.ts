import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        //required:true,
        trim:true
    },
    lastname:{
        type:String,
        //required:true,
        trim:true
    },
    email:{
        type:String,
        //required:true,
        unique:true,
        trim:true,
        
    },
    password:{
        type:String,
        //required:true,
    }
},{timestamps:true})

  
var User = mongoose.model('users', UserSchema);

module.exports = {
    User
}