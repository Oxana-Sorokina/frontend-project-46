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

const iter = (diff, path) => diff
  .filter((node) => node.type !== 'unchanged')
  .map((node) => {
    // если путь пуст, то node.key. Если уже содержит путь, . добавляется перед node.key
    const propertyPath = path ? `${path}.${node.key}` : node.key;
    switch (node.type) {
      case 'removed':
        return `Property '${propertyPath}' was removed`;
      case 'added':
        return `Property '${propertyPath}' was added with value: ${getString(node.value)}`;
      case 'changed':
        return `Property '${propertyPath}' was updated. From ${getString(node.value1)} to ${getString(node.value2)}`;
      case 'nested':
        return iter(node.children, propertyPath).join('\n');
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

const getPlain = (tree) => iter(tree, '').join('\n');

export default getPlain;
