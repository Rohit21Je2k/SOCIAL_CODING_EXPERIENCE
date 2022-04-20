import User from "../../models/user.js";
import Groups from "../../models/groups.js";
import httpError from "../../util/functions/httpError.js";

const joinGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const { username } = req.decodedToken;

    if (!groupId || groupId === "") {
      throw httpError("invalid groupId");
    }

    if (!username || username === "") {
      throw httpError("invalid username");
    }

    const existingGroup = await Groups.findById(groupId);
    if (!existingGroup) {
      throw httpError("group not found");
    }

    let admin = existingGroup.admin;
    if (!admin || admin === "") {
      throw httpError("invalid admin");
    }
    admin = await User.findOne({ username: admin });
    if (!admin) {
      throw httpError("couldn't find admin");
    }

    admin.groupRequests.push({
      groupId,
      username,
    });
    await admin.save();

    res.send({
      message: "request to join group sent",
    });
  } catch (err) {
    console.log(err);
    if (err.error) {
      return res.status(400).send(err);
    }
    res.status(400).send("couldn't send request to join group");
  }
};

export default joinGroup;
