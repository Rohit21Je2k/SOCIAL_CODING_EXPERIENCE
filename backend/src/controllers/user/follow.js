import usermodel from "../../models/user.js";
import { httpError } from "../../util/functions/_index.js";
const follow = async (req, res, next) => {
  const username1 = req.decodedToken.username;
  const username2 = req.body.username2;

  try {
    if(!username1 || username1!=''){
      throw httpError("user name 1 is invalid!");
    }
    if(!username2 || username2!=''){
      throw httpError("user name 2 is invalid!");
    }

    const user1 = await usermodel.findOne({ username: username1 });
    const user2 = await usermodel.findOne({ username: username2 });
    if (user1.following.indexOf(username2) == -1) {
      // user1 is following the user2
      // so in user2 follower array , the user1 will be added
      // and user1 following array , user2 will be added
      await user1.following.push(username2);
      await user1.save();

      await user2.followers.push(username1);
      await user2.save();

      return res.status(200).json({ message: "following him now" });
    } else {
      //cheking first wether the user2 is already in user1 followers list
      res.status(200).json({ message: "already following" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "failed to make changes",
    });
  }
};

export default follow;
