const extractLeetCode = (data) => {
  return [
    {
      type: "String",
      title: "UserName",
      value: data.username,
    },
    {
      type: "String",
      title: "Profile Rank",
      value: data.profileRank,
    },
    {
      type: "String",
      title: "Contest Rank",
      value: data.contestRank,
    },
    {
      type: "String",
      title: "Contest Rating",
      value: data.contestRating,
    },
    {
      type: "String",
      title: "Contest Attended",
      value: data.contestAttended,
    },
    {
      type: "String",
      title: "Total Solved",
      value: data.totalSolved,
    },
    {
      type: "String",
      title: "Easy",
      value: data.easy,
    },
    {
      type: "String",
      title: "Medium",
      value: data.medium,
    },
    {
      type: "String",
      title: "Hard",
      value: data.hard,
    },

    {
      type: "Array",
      title: "Languages Used",
      value: data.languages,
    },
    {
      type: "Array",
      title: "Recent 5 Submissions",
      value: data.recentAC,
    },
  ];
};

export default extractLeetCode;
