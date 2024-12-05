import getStylish from './stylish.js';
import getPlain from './plain.js';

const selectStyle = (tree, styleName = 'stylish') => {
  if (styleName === 'stylish') {
    return getStylish(tree);
  }
  if (styleName === 'plain') {
    return getPlain(tree);
  }
  if (styleName === 'json') {
    return JSON.stringify(tree);
  }
  throw new Error('Unknown style.');
};

export default selectStyle;
