import importing from './visitors/importing';
import {visit, formatCodeString} from './lib/utils';

let input = formatCodeString(`
  var Router = 'HELLO!';
  var ReactRouter = require('react-router');
  var Route = ReactRouter.Route;
`);

let output = '';
output = visit(formatCodeString(input), importing);
input = output;

console.log(formatCodeString(output));
