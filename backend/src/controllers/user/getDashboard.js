import { httpError } from "../../middleware/httpError.js";
import User from "../../models/user.js";
import { fetchLeetCode } from "../platform/leetcode/fetchLeetCode.js";
import { fetchGithub } from "../platform/github/fetchGithub.js";

// 1 min = 60,000 milliseconds
const oneMinToMilli = 60_000;
const updateCycle = 30 * oneMinToMilli;

export const getDashboard = async (req, res) => {
  try {
    const { username } = req.params;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      throw httpError("User not found");
    }

    const currDate = new Date().getTime();
    const nextUpdateCycle = existingUser.nextUpdateCycle;
    if (currDate >= nextUpdateCycle) {
      const github_username = existingUser.github.username;
      const leetcode_username = existingUser.leetcode.username;
      const codechef_username = existingUser.codechef.username;
      const leetcode_data = await fetchLeetCode(leetcode_username);
      const github_data = await fetchGithub(github_username);
      existingUser.leetcode = leetcode_data;
      existingUser.github = github_data;
      existingUser.nextUpdateCycle = new Date().getTime() + updateCycle;
      await existingUser.save();
    }
    res.send({
      name: existingUser.name,
      username: existingUser.username,
      rank: existingUser.rank,
      github: existingUser.github,
      leetcode: existingUser.leetcode,
      codechef: existingUser.codechef,
    });
  } catch (err) {
    console.log(err);
    if (err.error) {
      res.send(err);
    } else {
      res.send(httpError("couldn't get user data"));
    }
  }
};
