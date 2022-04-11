import User from "../../models/user.js";

const getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ users });
};

export default getUsers;
