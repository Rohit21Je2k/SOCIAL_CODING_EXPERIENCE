import User from "../../models/user.js";
import Groups from "../../models/groups.js";
import httpError from "../../util/functions/httpError.js";

const acceptMember = async (req, res) => {
  try {
    const { groupId, requestedUser } = req.body;
    const { username: adminUsername } = req.decodedToken;

    if (!groupId || groupId === "") {
      throw httpError("invalid groupId");
    }

    if (!requestedUser || requestedUser === "") {
      throw httpError("invalid requestedUser");
    }

    if (!adminUsername || adminUsername === "") {
      throw httpError("invalid adminUsername");
    }

    const admin = await User.findOne({ username: adminUsername });
    if (!admin) {
      throw httpError("couldn't find admin");
    }

    let userToAdd;
    admin.groupRequests = admin.groupRequests.filter((request) => {
      if (request.username === requestedUser) {
        userToAdd = request.username;
      } else {
        return request;
      }
    });

    if (!userToAdd) {
      throw httpError("invalid user , cannot add to group");
    }

    userToAdd = await User.findOne({ username: userToAdd });
    if (!userToAdd) {
      throw httpError("invalid username, cannot add to group");
    }

    const existingGroup = await Groups.findById(groupId);
    if (!existingGroup) {
      throw httpError("group not found");
    }
    existingGroup.members++;

    userToAdd.groups.push({
      id: existingGroup._id,
      name: existingGroup.name,
    });

    await existingGroup.save();
    await userToAdd.save();
    await admin.save();

    res.send({
      message: "user successfully added to groupt",
    });
  } catch (err) {
    console.log(err);
    if (err.error) {
      return res.status(400).send(err);
    }
    res.status(400).send(httpError("couldn't add user to group"));
  }
};

export default acceptMember;
