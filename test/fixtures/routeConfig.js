import test from 'tape';
import {visit} from '../../lib/utils';
import routeConfigVisitor from '../../visitors/routeConfig';

test('<Route> handler is renamed to component', assert => {
  // arrange
  const input = '<Route handler={Home} />;';
  const expected = '<Route component={Home} />;';

  // act
  const result = visit(input, routeConfigVisitor);

  // assert
  assert.equal(result, expected);
  assert.end();
});

test('<Route> name is removed', assert => {
  const input = '<Route name="app" />;';
  const expected = '<Route />;';

  const result = visit(input, routeConfigVisitor);

  assert.equal(result, expected);
  assert.end();
});

test('attributes of same name on other components are not affected', assert => {
  const input = '<CustomComponent name="Timmy" age="42" handler="Jimmy" />;';
  const expected = '<CustomComponent name="Timmy" age="42" handler="Jimmy" />;';

  const result = visit(input, routeConfigVisitor);

  assert.equal(result, expected);
  assert.end();
})
