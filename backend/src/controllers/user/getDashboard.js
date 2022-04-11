import { httpError } from "../../util/functions/_index.js";
import User from "../../models/user.js";
import {
  fetchGithub,
  fetchLeetCode,
  fetchCodeChef,
} from "../../util/api/_index.js";

// 1 min = 60,000 milliseconds
const oneMinToMilli = 60_000;
const updateCycle = 30 * oneMinToMilli;

const getDashboard = async (req, res) => {
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
      const codechef_data = await fetchCodeChef(req.browser, codechef_username);
      const leetcode_rank = leetcode_data.profileRank;
      const codechef_rank =
        codechef_data.globalRank == "Inactive"
          ? 500_000
          : codechef_data.globalRank;
      const rank = (leetcode_rank + codechef_rank) / 2;
      if (leetcode_data) {
        existingUser.leetcode = leetcode_data;
      }
      if (github_data) {
        existingUser.github = github_data;
      }
      if (codechef_data) {
        existingUser.codechef = codechef_data;
      }
      existingUser.rank = rank;
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

export default getDashboard;
