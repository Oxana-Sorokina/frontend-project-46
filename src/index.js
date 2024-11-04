import _ from 'lodash';
import parseFile from './parse.js';
import { transformaterPath, getFormatFile, dataDiff} from './utils.js';

// абсолютный путь: /home/oxana/frontend-project-46/__fixtures__/file1.json
// относительный путь: ../__fixtures__/file1.json

const gendiff = (filepath1, filepath2) => {
  const readingFile1 = transformaterPath(filepath1);
  const readingFile2 = transformaterPath(filepath2);
  const formatFile1 = getFormatFile(filepath1);
  const formatFile2 = getFormatFile(filepath2);
  const parseFile1 = parseFile(readingFile1, formatFile1);
  const parseFile2 = parseFile(readingFile2, formatFile2);
  const diff = dataDiff(parseFile1, parseFile2);
    return `{\n${diff}\n}`;
};

export default gendiff;


//JSON.stringify();