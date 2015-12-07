import {parse} from 'babylon';
import traverse from 'babel-traverse';
import generate from 'babel-generator';

const runCodeMod = (input, visitor) => {
  const ast = parse(input, {sourceType: 'module', plugins: ['jsx']});

  traverse(ast, visitor);

  const output = generate(ast, {
    quotes: 'single',
    concise: true,
    compact: false
  }, input);

  return output.code;
};

export default {
  runCodeMod
};
