import {parse} from 'babylon';
import traverse from 'babel-traverse';
import generate from 'babel-generator';
import visitors from './visitors';

// TODO: make this run all the mods
import {visit, formatCodeString} from './test/utils';

let input = formatCodeString(`
  var Router = 'HELLO!';
  var ReactRouter = require('react-router');
  var Route = ReactRouter.Route;
`);

let output = '';

visitors.forEach(v => {
  output = visit(formatCodeString(input), v);
  input = output;
});

console.log(formatCodeString(output));
