import Groups from "../../models/groups.js";
import httpError from "../../util/functions/httpError.js";

const searchGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    if (!groupName || groupName === "") {
      throw httpError("invalid groupname");
    }

    const foundGroups = await Groups.find({ name: groupName });
    if (!foundGroups || foundGroups.length === 0) {
      throw httpError("no group found");
    }

    res.status(200).send({
      groups: foundGroups,
    });
  } catch (err) {
    console.log(err);
    if (err.error) {
      return res.status(400).send(err);
    }
    res.status(400).send("couldn't find any group");
  }
};

export default searchGroup;
