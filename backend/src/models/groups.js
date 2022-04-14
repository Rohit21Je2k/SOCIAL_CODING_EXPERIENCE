import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupsSchema = new Schema({
  admin: { type: String, required: true },
  name: { type: String, required: true },
  members: { type: Number, required: true },
  messages: Array,
});

const model = mongoose.model("Group", groupsSchema);

export default model;
