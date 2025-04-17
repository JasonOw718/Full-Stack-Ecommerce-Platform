const truncateText = (text, size = 80) => {
  if (text.length > size) {
    return text.slice(0, size);
  }
  return text;
};

export default truncateText;
