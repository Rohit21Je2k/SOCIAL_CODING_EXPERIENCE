import apiUrl from "../../api";
export const getLeetcodeData = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/api/cproutes/leetcode/${userId}`);
    const data = await response.json();
    const {
      rank,
      globalRanking,
      totalSolved,
      easy,
      medium,
      hard,
      contest,
      langs,
      recent5,
    } = data;
    return [
      {
        type: "String",
        title: "UserName",
        value: userId,
      },
      {
        type: "String",
        title: "Rank",
        value: rank,
      },
      {
        type: "String",
        title: "Global Ranking",
        value: globalRanking,
      },
      {
        type: "String",
        title: "Total Solved",
        value: totalSolved,
      },
      {
        type: "String",
        title: "Contest Rating",
        value: contest.rating,
      },
      {
        type: "String",
        title: "Contest Attended",
        value: contest.attented,
      },
      {
        type: "String",
        title: "Easy",
        value: easy,
      },
      {
        type: "String",
        title: "Medium",
        value: medium,
      },
      {
        type: "String",
        title: "Hard",
        value: hard,
      },

      {
        type: "Array",
        title: "Languages Used",
        value: langs,
      },
      {
        type: "Array",
        title: "Recent 5 Submission",
        value: recent5,
      },
    ];
  } catch (err) {
    console.log(err);
    return null;
  }
};
