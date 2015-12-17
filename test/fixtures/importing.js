import test from 'tape';
import {visit, formatCodeString} from '../../lib/utils';
import importVisitor from '../../visitors/importing';

test('import Router using destructured object property', assert => {
  // arrange
  const input = `import Router from 'react-router';`;
  const expected = `import { Router } from 'react-router';`;

  // act
  const result = visit(input, importVisitor);

  // assert
  assert.equal(result, expected);
  assert.end();
});

test('import Router and Route using desctructured object properties', assert => {
  // arrange
  const input = formatCodeString(`
      import Router from 'react-router';
      const Route = Router.Route;
    `);
  const expected = formatCodeString(`
      import { Router, Route } from 'react-router';
    `);

  // act
  const result = visit(input, importVisitor);

  // assert
  assert.equal(result, expected);
  assert.end();
});
