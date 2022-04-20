import usermodel from "../../models/user.js";

const unFollow = async (req, res) => {
  // user1 ke followers main

  const username1 = req.decodedToken.username;
  const username2 = req.body.username2;

  try {
    const user1 = await usermodel.findOne({ username: username1 });
    const user2 = await usermodel.findOne({ username: username2 });

    if (user1.following.indexOf(username2) != -1) {
      await user1.following.splice(user1.following.indexOf(username2), 1);
      await user1.save();

      await user2.followers.splice(user1.following.indexOf(username1), 1);
      await user2.save();

      return res.status(200).json({ message: "unfollowed him now" });
    } else {
      res.status(200).json({ message: "not following him already" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default unFollow;
