// склеивает путь через функцию resole
// возвращает расширение в пути через функцию extname
import path from 'path';
// readFileSync - используется для чтения файла
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const transformaterPath = (filePath) => {
    const rootPath = process.cwd(filePath);
    const getAbsPath = path.resolve(rootPath, '__fixtures__', filePath.split('/').pop());
    return readFileSync(getAbsPath, 'utf-8');
};

const getFormatFile = (filePath) => {
    return path.extname(filePath).slice(1);
};

const dataDiff = (data1, data2) => {
    const result = [];
    // получим массив уникальных ключей, без повтора, в алф. порядке
    const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
    for (const key of keys) {
        if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
            if (data1[key] === data2[key]) {
                result.push(`    ${key}: ${data1[key]}`);
            } else {
                result.push(`  - ${key}: ${data1[key]}`);
                result.push(`  + ${key}: ${data2[key]}`);
            }
        } else if (Object.hasOwn(data1, key)) {
            result.push(`  - ${key}: ${data1[key]}`);
        } else {
            result.push(`  + ${key}: ${data2[key]}`);
        }
    }
    return result.join('\n');
};



export { transformaterPath, getFormatFile, dataDiff};


