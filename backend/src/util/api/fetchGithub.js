import axios from "axios";
const fetchGithub = async (username) => {
  try {
    const response = await axios(`https://api.github.com/users/${username}`);
    const data = response.data;
    const { public_repos, followers, following, created_at } = data;
    return {
      username,
      publicRepos: public_repos,
      followers: followers,
      following: following,
      createdAt: created_at,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default fetchGithub;
