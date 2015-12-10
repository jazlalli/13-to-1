import {parse} from 'babylon';
import traverse from 'babel-traverse';
import generate from 'babel-generator';
import visitors from './visitors';

// TODO: make this run all the mods
import {visit, formatCodeString} from './test/utils';

let input = `
  var Router = require('react-router');
  var Route = Router.Route;
`;

let output = '';

visitors.forEach(v => {
  output = visit(formatCodeString(input), v);
  input = output;
});

console.log(formatCodeString(output));
