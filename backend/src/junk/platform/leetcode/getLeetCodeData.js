import axios from "axios";
import { httpError } from "../../../middleware/httpError.js";
import { query } from "./query.js";

export const getLeetCodeData = async (req, res) => {
  try {
    const { userId } = req.params;
    const url = "https://leetcode.com/graphql/";
    const variables = {
      username: userId,
      limit: 5,
    };
    const response = await axios({
      method: "POST",
      url: url,
      withCredentials: true,
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ query, variables }),
    });
    const data = response.data.data;
    const matchedUser = data.matchedUser;
    if (matchedUser == null) {
      throw httpError("User not found");
    }
    const userContests = data.userContestRanking;
    const userSubmissions = matchedUser.submitStats.acSubmissionNum;
    const userLanguages = matchedUser.languageProblemCount;
    const recentAC = data.recentAcSubmissionList;
    const result = {
      username: matchedUser.username,
      profileRank: matchedUser.profile.ranking,
      contestRank: userContests?.globalRanking || 0,
      contestRating: Math.floor(userContests?.rating || 0),
      contestAttended: userContests?.attendedContestsCount || 0,
      totalSolved: userSubmissions[0].count,
      easy: userSubmissions[1].count,
      medium: userSubmissions[2].count,
      hard: userSubmissions[3].count,
      languages: userLanguages.map((language) => language.languageName),
      recentAC: recentAC.map((problem) => problem.title),
    };
    res.send(result);
  } catch (err) {
    // how to check error in axios err.response.data
    console.log(err);
    if (err.error) {
      res.send(err);
    } else {
      res.send(httpError("Failed to fetch Leetcode profile"));
    }
  }
};
