export const getCodeChefData = async () => {
  try {
    const response = await fetch(url, {
      mode: "cors",
      credentials: "same-origin",
    });
    const data = await response.data;
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
