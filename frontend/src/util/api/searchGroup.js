import apiUrl from "../../api";
const searchGroup = async (groupName, token) => {
  try {
    const url = apiUrl + "/api/groups/search";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        groupName,
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

export default searchGroup;
