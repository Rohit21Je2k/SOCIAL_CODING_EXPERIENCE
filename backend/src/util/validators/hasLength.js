const hasLength = (string, min, max) => {
  const length = string.length;
  if (length != -1 && length < min) {
    return false;
  }
  if (length != -1 && length > max) {
    return false;
  }
  return true;
};

export default hasLength;
