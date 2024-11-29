import getStylish from './stylish.js';

const selectStyle = (tree, styleName = 'stylish') => {
  if (styleName === 'stylish') {
    return getStylish(tree);
  }
  throw new Error(`Unknown style: ${styleName}.`);
};

export default selectStyle;
