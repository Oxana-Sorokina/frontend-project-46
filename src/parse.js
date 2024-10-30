import path from 'path';
// readFileSync - используется для чтения файла. Принимает путь к файлу(относительный или абсолютный)
import { readFileSync } from 'node:fs';

const getFormatFile = (filePath) => {
    return path.extname(filePath).slice(1);
}
console.log(getFormatFile('../__fixtures__/file1.json'));

const parseFileOnFormat = (file, format) => {
    if(format === 'json') {
        return JSON.parse(file);
    } else {
        console.log("Другой формат");
    }
};

const parseFile = (filePath) => {
    const format = getFormatFile(filePath);
    const file = readFileSync(filePath, 'utf-8');
    return parseFileOnFormat(file, format);
};

export default parseFile;