import {parse} from 'babylon';
import traverse from 'babel-traverse';
import generate from 'babel-generator';

export const visit = (input, visitor) => {
  const ast = parse(input, {sourceType: 'module', plugins: ['jsx']});

  traverse(ast, visitor);

  const output = generate(ast, {
    quotes: 'single',
    concise: false,
    compact: false
  }, input);

  return output.code;
};

export const formatCodeString = (input) => {
  const lines = input.split(/(?:\r\n|\n|\r)/);
  return lines
    .map(line => line.replace(new RegExp('^(\\s+)', 'igm'), ''))
    .filter(line => line)
    .join('\n');
}