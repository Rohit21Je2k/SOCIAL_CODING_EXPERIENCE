import User from "../models/user.js";

export const getGlobalLeaderboard = async (req, res, next) => {
  try {
    const users = await User.find({}).select(["email", "likes"]);
    // console.log(users);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send("failed");
  }
};
