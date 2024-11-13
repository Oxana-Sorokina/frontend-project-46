import yaml from 'js-yaml';

const parseFile = (file, format) => {
  if (format === 'json') {
    return JSON.parse(file);
  }
  if (format === 'yaml' || format === 'yml') {
    return yaml.load(file);
  }
  throw new Error(`Unknown format: ${format}.`);
};

export default parseFile;
