#!/usr/bin/env node

// импортируем объект program из библиотеки commander
import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  // формат ввода, в котором ожидается результат
  .option('-f, --format <type>', 'output format')
  .option('-h, --help', 'output usage information')
  // действие, которое будет выполнено при запуске программы с файлами
  .action((filepath1, filepath2, option) => {
    // позволяет получить доступ к параметрам, указанным пользователем при запуске
    //const option = program.opts();
    // чтобы получить значение опции -f, мы обращаемся к свойству format этого объекта, то есть option.format
    console.log(gendiff(filepath1, filepath2, option.format));
  });


// проверка и сравнение переданных аргументов с опциями и командами из кода.
// далее сохраняются в объекте program
program.parse(process.argv);

// если аргументы не были переданы, то вызывается хелп с информацией о доступных опциях
if (!program.args.length) {
    program.help();
}