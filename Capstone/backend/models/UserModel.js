import { Schema, model } from "mongoose";

const userSchema = new Schema(
{
firstName: {
type: String,
required: [true, "First name is required"],
trim: true
},
lastName: {
type: String,
trim: true
},
email: {
type: String,
required: [true, "Email required"],
unique: true,
lowercase: true,
trim: true
},
password: {
type: String,
required: [true, "Password required"],
},
role: {
type: String,
enum: ["USER", "AUTHOR", "ADMIN"],
required: [true, "Invalid role"],
},
profileImageUrl: {
type: String,
default: ""
},
isUserActive: {
type: Boolean,
default: true
}
},
{
timestamps: true,
versionKey: false,
strict: "throw",
}
);

//create model
export const UserModel = model("user", userSchema);