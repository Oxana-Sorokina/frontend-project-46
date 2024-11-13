import parseFile from './parsers.js';
import { transformaterPath, getFormatFile, dataDiff } from './utils.js';

const genDiff = (filepath1, filepath2) => {
  const readingFile1 = transformaterPath(filepath1);
  const readingFile2 = transformaterPath(filepath2);
  const formatFile1 = getFormatFile(filepath1);
  const formatFile2 = getFormatFile(filepath2);
  const parseFile1 = parseFile(readingFile1, formatFile1);
  const parseFile2 = parseFile(readingFile2, formatFile2);
  const diff = dataDiff(parseFile1, parseFile2);
  return `{\n${diff}\n}`;
};

export default genDiff;

// JSON.stringify();
