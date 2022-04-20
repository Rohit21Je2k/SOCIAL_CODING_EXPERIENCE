import apiUrl from "../../api";
const createGroup = async (groupName, username, token) => {
  try {
    const url = apiUrl + "/api/groups/create";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        groupName,
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

export default createGroup;
