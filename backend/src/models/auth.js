import mongoose from "mongoose";

const Schema = mongoose.Schema;

const authSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

const model = mongoose.model("Auth", authSchema);

export default model;
