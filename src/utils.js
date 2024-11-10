// склеивает путь через функцию resole
// возвращает расширение в пути через функцию extname
import path from 'path';
// readFileSync - используется для чтения файла
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const transformaterPath = (filepath) => {
  const rootPath = process.cwd(filepath);
  const getAbsPath = path.resolve(rootPath, '__fixtures__', filepath.split('/').pop());
  return readFileSync(getAbsPath, 'utf-8');
};

const getFormatFile = (filepath) => path.extname(filepath).slice(1);

const dataDiff = (data1, data2) => {
  // получим массив уникальных ключей, без повтора, в алф. порядке
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const result = keys.map((key) => {
    // если ключ есть в обоих объектах
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      // если значения ключа одинаковые в обоих объектах
      if (data1[key] === data2[key]) {
        // возвращаем без знака ключ:значение
        return `    ${key}: ${data1[key]}`;
        // иначе возвращаем старое значение с -
        // новое значение с +
      }
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;

      // если ключ есть в 1 объекте
    } if (Object.hasOwn(data1, key)) {
      // возвращаем с - ключ:значение
      return `  - ${key}: ${data1[key]}`;
      // иначе(если ключ только во 2 объекте)
    }
    // возвращаем с + ключ:значение
    return `  + ${key}: ${data2[key]}`;
  });

  return result.join('\n');
};

export { transformaterPath, getFormatFile, dataDiff };
