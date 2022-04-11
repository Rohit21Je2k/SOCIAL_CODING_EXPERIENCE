import apiUrl from "../../api";
const search = async (username) => {
  try {
    const url = apiUrl + "/api/users/search/" + username;
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      return null;
    }
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default search;
