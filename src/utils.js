// склеивает путь через функцию resole
// возвращает расширение в пути через функцию extname
import path from 'path';
// readFileSync - используется для чтения файла
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const readFixtureFile = (filepath) => {
  // корневая директория
  const rootPath = process.cwd();
  // абсолютный путь до файла в директории
  const absPath = path.resolve(rootPath, '__fixtures__', path.basename(filepath));
  // чтение файла
  return readFileSync(absPath, 'utf-8');
};

const getFormatFile = (filepath) => path.extname(filepath).slice(1);

const dataDiff = (data1, data2) => {
  // объединяем ключи без повтора, в алф. порядке
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const result = keys.map((key) => {
    // если ключа нет в data1, он добавлен в data2
    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    // если ключа нет в data2, он удален из data1
    if (!Object.hasOwn(data2, key)) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      };
    }
    // если оба значения объекты и ключи есть в обоих файлах, вложенные
    // запускается рекурсия для обработки вложенности
    if ((_.isObject(data1[key])) && (_.isObject(data2[key]))) {
      return {
        key,
        type: 'nested',
        children: dataDiff(data1[key], data2[key]),
      };
    }
    // если ключ есть в обоих файлах, но значения разные, измененные
    if (data1[key] !== data2[key]) {
      return {
        key,
        type: 'changed',
        value1: data1[key],
        value2: data2[key],
      };
    }
    // если ключ есть в обоих файлах, их значения одинаковы, неизмененные
    return {
      key,
      type: 'unchanged',
      value: data1[key],
    };
  });
  return result;
};

export { readFixtureFile, getFormatFile, dataDiff };
