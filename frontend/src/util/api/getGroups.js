import apiUrl from "../../api";
const getGroups = async (username, token) => {
  try {
    const url = apiUrl + "/api/groups/getGroups";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      return null;
    }
    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw null;
  }
};

export default getGroups;
