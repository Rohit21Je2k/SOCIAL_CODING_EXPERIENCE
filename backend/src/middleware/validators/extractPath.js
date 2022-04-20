export const extractPath = (req, path) => {
  const arr = path.split(".");
  let value = req;
  arr.forEach((element, index) => {
    if (index == 0) {
      return;
    }
    value = value[element];
  });
  return value;
};
