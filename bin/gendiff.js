#!/usr/bin/env node

// импортируем объект program из библиотеки commander
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  // формат в котором ожидается результат
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  // действие, которое будет выполнено при запуске программы с файлами
  .action((filepath1, filepath2, option) => {
    // позволяет получить доступ к параметрам, указанным пользователем при запуске
    // чтобы получить значение опции -f, мы обращаемся к свойству format этого объекта-option.format
    console.log(genDiff(filepath1, filepath2, option.format));
  });

// проверка и сравнение переданных аргументов с опциями и командами из кода.
// далее сохраняются в объекте program
program.parse();
