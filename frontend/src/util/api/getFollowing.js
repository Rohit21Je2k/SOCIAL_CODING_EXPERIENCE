import apiUrl from "../../api";
const getFollowing = async (username) => {
  try {
    const url = apiUrl + "/api/users/following/" + username;
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (err) {
    throw null;
  }
};

export default getFollowing;
