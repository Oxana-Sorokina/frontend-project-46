import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';
import selectStyle from '../src/formatters/index.js';
import iter from '../src/formatters/stylish.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');

const expectedFile1 = readFile('expected_file_stylish.txt').trim();

const file1 = getFilePath('file1.json');
const file2 = getFilePath('file2.json');
const file3 = getFilePath('file1.yaml');
const file4 = getFilePath('file2.yaml');

test('comparing files', () => {
  expect(genDiff(file1, file2)).toEqual(expectedFile1);
  expect(genDiff(file3, file4)).toEqual(expectedFile1);
});

test('unknown format', () => {
  const unknownFile = 'file0';
  const unknownFormat = 'txt';
  expect(() => parseFile(unknownFile, unknownFormat)).toThrow(`Unknown format: ${unknownFormat}.`);
});
