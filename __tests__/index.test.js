import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';
import selectStyle from '../src/formatters/index.js';
import getStylish from '../src/formatters/stylish.js';
import getPlain from '../src/formatters/plain.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');

const expectedFile1 = readFile('expected_file_stylish.txt').trim();
const expectedFile2 = readFile('expected_file_plain.txt').trim();

const file1 = getFilePath('file1.json');
const file2 = getFilePath('file2.json');
const file3 = getFilePath('file1.yaml');
const file4 = getFilePath('file2.yaml');

test('comparing files', () => {
  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedFile1);
  expect(genDiff(file3, file4, 'stylish')).toEqual(expectedFile1);
});

test('plain format', () => {
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedFile2);
  expect(genDiff(file3, file4, 'plain')).toEqual(expectedFile2);
});

test('unknown format', () => {
  const unknownFile = 'file0';
  const unknownFormat = 'txt';
  expect(() => parseFile(unknownFile, unknownFormat)).toThrow(`Unknown format: ${unknownFormat}.`);
});

test('unknown style', () => {
  const unknownTree = [{ key: 'key', type: 'unknown', value: 'value' }];
  const unknownStyle = 'base';
  expect(() => selectStyle(unknownTree, unknownStyle)).toThrow(`Unknown style.`);
});

test('unknown type in plain format', () => {
  const diff = [{ key: 'key', type: 'unknown', value: 'value' }];
  expect(() => getPlain(diff)).toThrow(`Unknown type.`);
});

test('unknown type in stylish format', () => {
  const diff = [{ key: 'key', type: 'unknown', value: 'value' }];
  expect(() => getStylish(diff)).toThrow(`Unknown type.`);
});

test('empty tree', () => {
  expect(getStylish([])).toEqual('{\n}');
});
