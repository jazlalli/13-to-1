import test from 'tape';
import {visit, formatCodeString} from '../../lib/utils';
import requireVisitor from '../../visitors/requiring';

test('require returns single parent object instead of Router', assert => {
  // arrange
  const input = formatCodeString(`
    var Router = require('react-router');
    var Route = Router.Route;
  `);

  const expected = formatCodeString(`
    var ReactRouter = require('react-router');
    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
  `);

  // act
  const result = visit(input, requireVisitor);

  // assert
  assert.equal(formatCodeString(result), expected);
  assert.end();
});
