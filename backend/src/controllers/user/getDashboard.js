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
    // get username
    const { username } = req.params;
    const { loggedUser } = req.body;

    // search user
    const existingUser = await User.findOne({ username });
    let user2;
    if (!user2) {
      user2 = await User.findOne({ username: loggedUser });
    }
    // if user not found
    if (!existingUser) {
      throw httpError("User not found");
    }

    // check update cycle
    const currDate = new Date().getTime();
    const nextUpdateCycle = existingUser.nextUpdateCycle;
    if (currDate >= nextUpdateCycle) {
      // get usernames
      const github_username = existingUser.github.username;
      const leetcode_username = existingUser.leetcode.username;
      const codechef_username = existingUser.codechef.username;

      // create promises
      const leetcode_promise = fetchLeetCode(leetcode_username);
      const github_promise = fetchGithub(github_username);
      const codechef_promise = fetchCodeChef(req.browser, codechef_username);

      // fetch all promises
      const data = await Promise.all([
        leetcode_promise,
        github_promise,
        codechef_promise,
      ]);

      // get all profile data
      const leetcode_data = data[0];
      const github_data = data[1];
      const codechef_data = data[2];

      // update rank
      const leetcode_rank = leetcode_data.profileRank;
      const codechef_rank =
        codechef_data.globalRank == "Inactive"
          ? 500_000
          : codechef_data.globalRank;
      const rank = (Number(leetcode_rank) + Number(codechef_rank)) / 2;

      // update profile data
      if (leetcode_data) {
        existingUser.leetcode = leetcode_data;
      }
      if (github_data) {
        existingUser.github = github_data;
      }
      if (codechef_data) {
        existingUser.codechef = codechef_data;
      }

      // update rank and next update cycle
      existingUser.rank = rank;
      existingUser.nextUpdateCycle = new Date().getTime() + updateCycle;
      await existingUser.save();
    }

    // set follow status
    let followStatus;
    if (!user2) {
      followStatus = "none";
    } else if (username === loggedUser) {
      followStatus = "none";
    } else {
      followStatus = user2.following.includes(username)
        ? "following"
        : "follow";
    }

    // return response
    res.send({
      name: existingUser.name,
      username: existingUser.username,
      rank: existingUser.rank,
      github: existingUser.github,
      leetcode: existingUser.leetcode,
      codechef: existingUser.codechef,
      followStatus,
    });
  } catch (err) {
    console.log(err);
    if (err.error) {
      res.status(422).json(err);
    } else {
      res.status(422).json(httpError("couldn't get user data"));
    }
  }
};

export default getDashboard;
