const extractGithub = (data) => {
  return [
    {
      type: "String",
      title: "UserName",
      value: data.username,
    },
    {
      type: "String",
      title: "Public Repos",
      value: data.publicRepos,
    },
    {
      type: "String",
      title: "Followers",
      value: data.followers,
    },
    {
      type: "String",
      title: "Following",
      value: data.following,
    },
    {
      type: "String",
      title: "Created At",
      value: new Date(data.createdAt).toUTCString(),
    },
    {
      type: "iframe",
      title: "Activity",
      value: `https://ghchart.rshah.org/${data.username}`,
    },
  ];
};

export default extractGithub;
