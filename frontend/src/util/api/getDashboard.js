import apiUrl from "../../api";

const getDashboard = async (username) => {
  try {
    const response = await fetch(`${apiUrl}/api/users/dashboard/${username}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default getDashboard;
