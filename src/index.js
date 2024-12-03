import parseFile from './parsers.js';
import { readFixtureFile, getFormatFile, dataDiff } from './utils.js';
import selectStyle from './formatters/index.js';

const genDiff = (filepath1, filepath2, styleName = 'stylish') => {
  const readingFile1 = readFixtureFile(filepath1);
  const readingFile2 = readFixtureFile(filepath2);
  const formatFile1 = getFormatFile(filepath1);
  const formatFile2 = getFormatFile(filepath2);
  const parseFile1 = parseFile(readingFile1, formatFile1);
  const parseFile2 = parseFile(readingFile2, formatFile2);
  const diff = dataDiff(parseFile1, parseFile2);
  const result = selectStyle(diff, styleName);
  return result;
};

export default genDiff;
