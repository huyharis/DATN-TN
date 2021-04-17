export default Filter = type => {
  if (type !== "image/jpeg" && type !== "image/jpg" && type !== "image/png")
    return false;
  return true;
};
