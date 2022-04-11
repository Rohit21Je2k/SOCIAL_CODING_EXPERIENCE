import usermodel from "../../models/user.js";

const getFollowing = async (req, res) => {
  const { username } = req.params;
  const user = await usermodel.findOne({ username });
  return res.send({
    following: user.following,
    followers: user.followers,
  });
};

export default getFollowing;
