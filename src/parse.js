const parseFile = (file, format) => {
  if (format === 'json') {
    return JSON.parse(file);
  }
};

export default parseFile;
