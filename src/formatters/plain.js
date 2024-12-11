import _ from 'lodash';
// removed: '-' удаленный ключ
// added: '+' добавленный ключ
// changed измененный ключ
// unchanged неизмененный
// nested вложенный

const getString = (value) => {
  // если значение объект
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  // если значение строка
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const typeAdded = 'added';
const typeRemoved = 'removed';
const typeNested = 'nested';
const typeChanged = 'changed';
const typeUnchanged = 'unchanged';

const iter = (diff, path) => diff
  .filter((node) => node.type !== typeUnchanged)
  .map((node) => {
    // если путь пуст, то node.key. Если уже содержит путь, . добавляется перед node.key
    const propertyPath = path ? `${path}.${node.key}` : node.key;
    switch (node.type) {
      case typeRemoved:
        return `Property '${propertyPath}' was removed`;
      case typeAdded:
        return `Property '${propertyPath}' was added with value: ${getString(node.value)}`;
      case typeChanged:
        return `Property '${propertyPath}' was updated. From ${getString(node.value1)} to ${getString(node.value2)}`;
      case typeNested:
        return iter(node.children, propertyPath).join('\n');
      default:
        throw new Error('Unknown type.');
    }
  });

const getPlain = (tree) => iter(tree, '').join('\n');

export default getPlain;
