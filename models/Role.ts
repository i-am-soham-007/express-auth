import mongoose from "mongoose";
const RoleSchema = new mongoose.Schema({
    id: { type: String, unique: true,default: null }, 
    name:{
        type:String, 
        //required:true,
        trim:true
    },
    status: {
        type: Number,
        min: 0,
        max: 1,
        default: 1, // Set a default value (optional)
      },
},{timestamps:true})

const Role = mongoose.model('roles', RoleSchema);

module.exports = {
    Role
}