// склеивает путь через функцию resole
// возвращает расширение в пути через функцию extname
import path from 'path';
// readFileSync - используется для чтения файла
import { readFileSync } from 'node:fs';

const readFixtureFile = (filepath) => {
  // корневая директория
  const rootPath = process.cwd();
  // абсолютный путь до файла в директории
  const absPath = path.resolve(rootPath, '__fixtures__', path.basename(filepath));
  // чтение файла
  return readFileSync(absPath, 'utf-8');
};

const getFormatFile = (filepath) => path.extname(filepath).slice(1);

export { readFixtureFile, getFormatFile };
