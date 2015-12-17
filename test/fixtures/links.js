import test from 'tape';
import {visit, formatCodeString} from '../../lib/utils';
import linksVisitor from '../../visitors/links';

test('<Link> uses the path not the name', assert => {
  // arrange
  const input = formatCodeString(`
    <Link to="user">Mateusz</Link>
  `);

  const expected = formatCodeString(`
    <Link to="/users"}>Mateusz</Link>
  `);

  // act
  const result = visit(input, linksVisitor);

  // assert
  assert.equal(formatCodeString(result), expected);
  assert.end();
});

test('<Link> params are included in the path', assert => {
  // arrange
  const input = formatCodeString(`
    <Link to="user" params={{userId: user.id}}>Mateusz</Link>
  `);

  const expected = formatCodeString(`
    <Link to={\`/users/${user.id}\`}>Mateusz</Link>
  `);

  // act
  const result = visit(input, linksVisitor);

  // assert
  assert.equal(formatCodeString(result), expected);
  assert.end();
});
