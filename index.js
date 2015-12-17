import importing from './visitors/importing';
import {visit, formatCodeString} from './lib/utils';

const input = formatCodeString(`
  import Router from 'react-router';
  const Route = Router.Route;
`);

let output = '';
output = visit(formatCodeString(input), importing);

console.log('>', output);
