import apiUrl from "../../api";
export const getCodechefData = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/api/cproutes/codechef/${userId}`);
    const data = await response.json();
    const {
      total_rating,
      div,
      global_rank,
      country_rank,
      fully_solved,
      partially_solved,
    } = data;
    return [
      {
        type: "String",
        title: "UserName",
        value: userId,
      },
      {
        type: "String",
        title: "OverAll Rating",
        value: total_rating,
      },
      {
        type: "String",
        title: "Global Rank",
        value: global_rank,
      },
      {
        type: "String",
        title: "Country Rank",
        value: country_rank,
      },
      {
        type: "String",
        title: "Fully Solved",
        value: fully_solved,
      },
      {
        type: "String",
        title: "Div/Tier",
        value: div,
      },
      {
        type: "String",
        title: "Partially  Solved",
        value: partially_solved,
      },
    ];
  } catch (err) {
    console.log(err);
    return null;
  }
};
