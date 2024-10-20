#!/usr/bin/env node

// импортируем объект program из библиотеки commander
import { Command } from 'commander';
import gendiff from '../src/index.js';
const program = new Command();

program
  // имя программы
  .name('gendiff')
  // определяет два аргумента(пути к файлам), которые программа ожидает при запуске, для дальнейшего сравнения
  .arguments('<filepath1> <filepath2>')
  // описание программы
  .description('Compares two configuration files and shows a difference.')
  // версия программы
  .version('1.0.0', '-V, --version', 'output the version number')
  // формат ввода, в котором ожидается результат
  .option('-f, --format <type>', 'output format')
  // справка, как использовать программу
  .option('-h, --help', 'output usage information')
  // действие, которое будет выполнено при запуске программы с файлами
  .action((filepath1, filepath2, option) => {
    console.log(`путь к файлу 1: ${filepath1}`);
    console.log(`путь к файлу 2: ${filepath2}`);
    // позволяет получить доступ к параметрам, указанным пользователем при запуске
    //const option = program.opts();
    // чтобы получить значение опции -f, мы обращаемся к свойству format этого объекта, то есть option.format
    console.log(gendiff(filepath1, filepath2, option.format));
  });


// проверка и справнение переданных аргументов с опциями и командами из кода.
// далее сохраняются в объекте program
program.parse(process.argv);

// если аргументы не были переданы, то вызывается хелп с информацией о доступных опциях
if (!program.args.length) {
    program.help();
}


//Точкой входа в приложение должен быть тот файл, который экспортирует нашу интерфейсную функцию. В эталоне - это индекс.жс