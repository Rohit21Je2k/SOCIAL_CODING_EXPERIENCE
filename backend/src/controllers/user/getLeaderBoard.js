import User from "../../models/user.js";
import httpError from "../../util/functions/httpError.js";

const getLeaderBoard = async (req, res) => {
  try {
    const users = await User.find({})
      .select(["username", "rank", "-_id"])
      .sort({ rank: 1 })
      .limit(10);
    if (!users) {
      throw httpError("No users found");
    }
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    if (err.error) {
      return res.status(400).send(err);
    }
    res.status(400).send(httpError("Couldn't get data"));
  }
};

export default getLeaderBoard;
