import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    uname: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, 
}, { timestamps: true }); 

const UserModel = mongoose.model("Users", UserSchema, "Users");
export default UserModel;
