import test from 'tape';
import {visit, formatCodeString} from '../../lib/utils';
import routeHandlerVisitor from '../../visitors/routeHandler';

test('<RouteHandler> is replaced with this.props.children', assert => {
  // arrange
  const input = formatCodeString(`
    <RouteHandler/>
  `);

  const expected = formatCodeString(`
    {this.props.children}
  `);

  // act
  const result = visit(input, routeHandlerVisitor );

  // assert
  assert.equal(formatCodeString(result), expected);
  assert.end();
});

test('<RouteHandler> with props is replaced with cloneElement', assert => {
  // arrange
  const input = formatCodeString(`
    <RouteHandler someExtraProp={something}/>
  `);

  const expected = formatCodeString(`
    {React.cloneElement(this.props.children, {someExtraProp: something})}
  `);

  // act
  const result = visit(input, routeHandlerVisitor );

  // assert
  assert.equal(formatCodeString(result), expected);
  assert.end();
});
