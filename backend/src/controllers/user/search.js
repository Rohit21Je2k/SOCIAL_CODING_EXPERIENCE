import usermodel from "../../models/user.js";
import httpError from "../../util/functions/httpError.js";

const search = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await usermodel.findOne({ username });
    if (!user) {
      throw httpError("User Not Found");
    }
    return res.send({
      username: user.username,
    });
  } catch (err) {
    console.log(err);
    if (err.error) {
      return res.send(err);
    }
    res.send("couldn't find user");
  }
};

export default search;
