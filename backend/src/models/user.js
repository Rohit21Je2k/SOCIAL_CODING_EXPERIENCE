import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },

  username: { type: String, required: true, unique: true },

  github: {
    username: { type: String, required: true },
    publicRepos: Number,
    followers: Number,
    following: Number,
    createdAt: Date,
  },

  leetcode: {
    username: { type: String, required: true },
    profileRank: Number,
    profileRank: Number,
    contestRank: Number,
    contestRating: Number,
    contestAttended: Number,
    totalSolved: Number,
    easy: Number,
    medium: Number,
    hard: Number,
    languages: Array,
    recentAC: Array,
  },

  codechef: {
    username: { type: String, required: true },
  },

  rank: { type: Number, required: true },

  followers: Array,

  following: Array,

  nextUpdateCycle: { type: Number, required: true },
});

const model = mongoose.model("Userr", userSchema);

export default model;
