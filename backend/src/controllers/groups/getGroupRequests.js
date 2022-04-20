import User from "../../models/user.js";
import httpError from "../../util/functions/httpError.js";

const getGroupRequests = async (req, res) => {
  try {
    const { username } = req.decodedToken;
    if (!username || username === "") {
      throw httpError("invalid username");
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      throw httpError("user not found");
    }

    res.status(200).send({
      groupRequests: existingUser.groupRequests,
    });
  } catch (err) {
    console.log(err);
    if (err.error) {
      return res.status(400).send(err);
    }
    res.status(400).send("couldn't find user data");
  }
};

export default getGroupRequests;
