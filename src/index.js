// склеивает путь через функцию resole
import path from 'path';
// readFileSync - используется для чтения файла. Принимает путь к файлу(относительный или абсолютный)
import _ from 'lodash';
import parseFile from './parse.js';

// абсолютный путь: /home/oxana/frontend-project-46/__fixtures__/file1.json
// относительный путь: ../__fixtures__/file1.json

const gendiff = (filepath1, filepath2) => {
  const rootPath = process.cwd();

  // разбиваем путь на массив строк с разделителем / и возвращаем последний элемент file1.json
  const getAbsPath1 = path.resolve(rootPath, '__fixtures__', filepath1.split('/').pop());
  const getAbsPath2 = path.resolve(rootPath, '__fixtures__', filepath2.split('/').pop());

  const parseFile1 = parseFile(getAbsPath1);
  const parseFile2 = parseFile(getAbsPath2);

  return { parseFile1, parseFile2 };
};

export default gendiff;





/* НУЖНО ДОДЕЛАТЬ ВЫНОС ОБЩИХ ФУНКЦИЙ. ПОСМОТРЕТЬ 1 ПРОЕКТ
const getRootPath = () => process.cwd();
const getAbsPath = (filePath) => path.resolve(getRootPath, '__fixtures__', filePath.split('/').pop());
const readFile = (filePath) => readFileSync(getAbsPath, 'utf-8');
const parseFile = () => JSON.parse(readFile);

const gendiff = (filepath1, filepath2) => {
  console.log('передаем filepath1:', filepath1);
  console.log('передаем filepath2:', filepath2);

  //const rootPath = process.cwd(); // /home/oxana/frontend-project-46

  // разбиваем путь на массив строк с разделителем / и возвращаем последний элемент file1.json
  const absPath1 = getAbsPath(filepath1);
  const absPath2 = getAbsPath(filepath2);
  console.log('скорректированный path1:', absPath1);
  console.log('скорректированный path2:', absPath2);
  const readingFile1 = readFile(absPath1);
  const readingFile2 = readFile(absPath2);

  const parseFile1 = parseFile(readingFile1);
  const parseFile2 = parseFile(readingFile2);

  return JSON.stringify({ file1: parseFile1, file2: parseFile2 });
};*/