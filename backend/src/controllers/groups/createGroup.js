import Groups from "../../models/groups.js";
import User from "../../models/user.js";
import httpError from "../../util/functions/httpError.js";

const createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    const { username: admin } = req.decodedToken;
    if (!groupName || groupName === "") {
      throw httpError("invalid group name");
    }

    const existingUser = await User.findOne({ username: admin });
    if (!existingUser) {
      throw httpError("user not found");
    }

    // create new group
    const newGroup = new Groups({
      admin,
      name: groupName,
      members: 1,
    });
    await newGroup.save();

    existingUser.groups.push({
      id: newGroup._id,
      name: newGroup.name,
    });
    await existingUser.save();

    res.status(200).send({
      message: "new group created",
    });
  } catch (err) {
    console.log(err);
    if (err.error) {
      return res.status(400).send(err);
    }
    res.status(400).send("couldn't create new group");
  }
};

export default createGroup;
