const extractCodeChef = (data) => {
  return [
    {
      type: "String",
      title: "UserName",
      value: data.username,
    },
    {
      type: "String",
      title: "OverAll Rating",
      value: data.totalRating,
    },
    {
      type: "String",
      title: "Global Rank",
      value: data.globalRank,
    },
    {
      type: "String",
      title: "Country Rank",
      value: data.countryRank,
    },
    {
      type: "String",
      title: "Div/Tier",
      value: data.div,
    },
    {
      type: "String",
      title: "Fully Solved",
      value: data.fullySolved,
    },
    {
      type: "String",
      title: "Partially  Solved",
      value: data.partiallySolved,
    },
  ];
};

export default extractCodeChef;
