import apiUrl from "../../api";

const getDashboard = async (username, loggedUser) => {
  try {
    const response = await fetch(`${apiUrl}/api/users/dashboard/${username}`, {
      method: "POST",
      body: JSON.stringify({
        loggedUser: loggedUser ? loggedUser : null,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export default getDashboard;
