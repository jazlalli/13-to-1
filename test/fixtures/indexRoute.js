import test from 'tape';
import {visit, formatCodeString} from '../../lib/utils';
import indexRouteVisitor from '../../visitors/indexRoute';

test('use <IndexLink> instead of <DefaultRoute>', assert => {
  // arrange
  const input = formatCodeString(`
    <DefaultRoute />
  `);

  const expected = formatCodeString(`
    <IndexRoute />
  `);

  // act
  const result = visit(input, indexRouteVisitor);

  // assert
  assert.equal(formatCodeString(result), expected);
  assert.end();
});
