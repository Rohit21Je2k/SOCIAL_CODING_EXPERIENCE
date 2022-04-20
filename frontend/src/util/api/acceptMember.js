import apiUrl from "../../api";
const acceptMember = async (groupId, requestedUser, username, token) => {
  try {
    const url = apiUrl + "/api/groups/accept";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        groupId,
        requestedUser,
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

export default acceptMember;
