import _ from 'lodash';
// removed: '-' удаленный ключ
// added: '+' добавленный ключ
// changed измененный ключ
// unchanged неизмененный
// nested вложенный

// каждое погружение на один уровень добавляет четыре знака
const spaceCount = 4;
const replacer = ' ';

// отступ = глубина * количество отступов — смещение влево
// смещение влево — отступ в обратную сторону, т.е. спец. символ + пробел между ним и строкой

// отступы без сдвига с учетом глубины
const getSpaces = (depth) => {
  const indentSize = depth * spaceCount;
  return replacer.repeat(indentSize);
};

// отсупы со сдвигом с учетом глубины
const getSpacesWithShift = (depth) => {
  const indentSize = depth * spaceCount;
  return replacer.repeat(indentSize - 2);
};

// форматируем данные в строку
const convertString = (data, depth) => {
  if (_.isObject(data)) {
    const lines = Object.entries(data).map(
      ([key, value]) => `${getSpaces(depth + 1)}${key}: ${convertString(value, depth + 1)}`,
    );
    return `{\n${lines.join('\n')}\n${getSpaces(depth)}}`;
  }
  if (Array.isArray(data)) {
    return `[${data.map((item) => convertString(item, depth)).join(', ')}]`;
  }
  if (data === null) {
    return 'null';
  }
  return String(data);
};

// преобразуем дерево различий, дифф, в отформатированную строку
const iter = (diff, depth = 1) => diff.map((node) => {
  switch (node.type) {
    case 'removed':
      return `${getSpacesWithShift(depth)}- ${node.key}: ${convertString(node.value, depth)}`;
    case 'added':
      return `${getSpacesWithShift(depth)}+ ${node.key}: ${convertString(node.value, depth)}`;
    case 'changed': {
      return `${getSpacesWithShift(depth)}- ${node.key}: ${convertString(node.value1, depth)}\n${getSpacesWithShift(depth)}+ ${node.key}: ${convertString(node.value2, depth)}`;
    }
    case 'unchanged':
      return `${getSpaces(depth)}${node.key}: ${convertString(node.value, depth)}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${getSpaces(depth)}${node.key}: {\n${lines.join('\n')}\n${getSpaces(depth)}}`;
    }
    default:
      throw new Error('Unknown type.');
  }
});

// форматируем, вызывая итер
const getStylish = (tree) => {
  if (tree.length === 0) {
    return '{\n}';
  }
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};

export default getStylish;
