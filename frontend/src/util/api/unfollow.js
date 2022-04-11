import apiUrl from "../../api";
const unfollow = async (username1, username2) => {
  try {
    const url = apiUrl + "/api/users/unfollow/";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username1,
        username2,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
};

export default unfollow;