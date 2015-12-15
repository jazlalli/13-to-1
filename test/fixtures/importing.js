import test from 'tape';
import {visit, formatCodeString} from '../utils';
import importingVisitor from '../../visitors/importing';

test('import Router using destructured object property', assert => {
  // arrange
  const input = `import Router from 'react-router';`;
  const expected = `import { Router } from 'react-router';`;

  // act
  const result = visit(input, importingVisitor);

  // assert
  assert.equal(result, expected);
  assert.end();
});

test('import Router and Route using desctructured object properties', assert => {
  // arrange
  const input = `
    import Router from 'react-router';
    const Route = Router.Route;
  `;
  const expected = `import { Router, Route } from 'react-router';`;

  // act
  const result = visit(input, importingVisitor);

  // assert
  assert.equal(result, expected);
  assert.end();
});

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
  const result = visit(input, importingVisitor);

  // assert
  assert.equal(formatCodeString(result), expected);
  assert.end();
});
