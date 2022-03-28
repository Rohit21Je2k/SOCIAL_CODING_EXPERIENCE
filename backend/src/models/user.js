import mongoose from "mongoose";


const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  github_username: { type: String, required: true ,minlength:4},
  leetcode_username: { type: String, required: true , minlength:4},
  codechef_username: { type: String, required: true , minlength:4},
  likes:{type:Number},
  friends:{type:[String]},
});



const model = mongoose.model("User", userSchema);

export default model;
