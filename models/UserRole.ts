import mongoose from "mongoose";
const UserRoleSchema = new mongoose.Schema({
    user_id:{ type: String, required: true },
    role_id:{ type: String, required: true },
},{timestamps:true})

const userRole = mongoose.model('user_roles', UserRoleSchema);

module.exports = {
    userRole
}
