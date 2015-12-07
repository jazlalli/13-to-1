import test from 'tape';
import {runCodeMod} from '../utils';
import routeConfig from '../../mods/routeConfig';

const visitor = { enter: routeConfig };

test('<Route> handler is renamed to component', assert => {

  // arrange
  const input = '<Route handler={Home} />;';
  const expected = '<Route component={Home} />;';

  // act
  const result = runCodeMod(input, visitor);

  // assert
  assert.equal(result, expected);
  assert.end();
});

test('<Route> name is removed', assert => {
  const input = '<Route name="app" />;';
  const expected = '<Route />;';

  const result = runCodeMod(input, visitor);

  assert.equal(result, expected);
  assert.end();
});
