import apiUrl from "../../api";
const getLeaderBoard = async (username) => {
  try {
    const url = apiUrl + "/api/users/leaderboard";
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default getLeaderBoard;
