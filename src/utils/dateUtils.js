const convertToReadableString = (input = '') => {
  return new Date(input).toISOString();
};

export {
  convertToReadableString,
}