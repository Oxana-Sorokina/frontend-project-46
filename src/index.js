// импорт через рекваер???
import path from 'path';
//const path = require('node:path'); 
// readFileSync - используется для чтения файла. Принимает путь к файлу(относительный или абсолютный)
import { readFileSync } from 'node:fs';

const gendiff = (filepath1, filepath2) => {
    const getAbsPath1 = path.resolve(process.cwd(), filepath1);
    const getAbsPath2 = path.resolve(process.cwd(), filepath2);
    
    const readFile1 = readFileSync(getAbsPath1, 'utf-8');
    const readFile2 = readFileSync(getAbsPath2, 'utf-8');

    const parseFile1 = JSON.parse(readFile1);
    const parseFile2 = JSON.parse(readFile2);
  };

  export default gendiff;