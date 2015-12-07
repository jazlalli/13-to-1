import test from 'tape';
import {runCodeMod} from '../utils';
import importing from '../../mods/importing';

const visitor = { enter: importing };

test('import a single global instead of Router by default', assert => {

  // arrange
  const input = `
    var Router = require('react-router');
  `;

  const expected = `
    var ReactRouter = require('react-router');
    var Router = ReactRouter.Router;
  `;

  // act
  const result = runCodeMod(input, visitor);

  // assert
  assert.equal(result, expected);
  assert.end();
});
