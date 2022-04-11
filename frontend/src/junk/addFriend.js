import apiUrl from "../api";

export async function addFriend(userId, friendId) {
  try {
    await fetch(apiUrl + "/api/users/addfriend", {
      method: "POST",
      body: JSON.stringify({
        userId,
        friendId,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
}
