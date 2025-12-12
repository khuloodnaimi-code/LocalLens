import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    uname: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique email
    password: { type: String, required: true },
    profilepic: { type: String, required: false, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // role field
}, { timestamps: true }); // optional: adds createdAt & updatedAt

const UserModel = mongoose.model("Users", UserSchema, "Users");
export default UserModel;
