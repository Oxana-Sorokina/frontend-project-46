import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');

const expectedFile = readFile('expected_file.txt');
const file1 = '../__fixtures__/file1.json';
const file2 = '../__fixtures__/file2.json';

test('comparing files', () => {
  expect(genDiff(file1, file2)).toEqual(expectedFile);
});
