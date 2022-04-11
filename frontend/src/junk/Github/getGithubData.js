export const getGithubData = async (userId) => {
  try {
    const response = await fetch(`https://api.github.com/users/${userId}`);
    const data = await response.json();
    const { public_repos, followers, following, created_at } = data;
    return [
      {
        type: "String",
        title: "UserName",
        value: userId,
      },
      {
        type: "String",
        title: "Public Repos",
        value: public_repos,
      },
      {
        type: "String",
        title: "Followers",
        value: followers,
      },
      {
        type: "String",
        title: "Following",
        value: following,
      },
      {
        type: "String",
        title: "Created At",
        value: new Date(created_at).toUTCString(),
      },
      {
        type: "iframe",
        title: "Activity",
        value: `https://ghchart.rshah.org/${userId}`,
      },
    ];
  } catch (err) {
    console.log(err);
    return null;
  }
};
