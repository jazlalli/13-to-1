import test from 'tape';
import {visit, formatCodeString} from '../../lib/utils';
import locationsVisitor from '../../visitors/locations';

test('import and use history', assert => {
  // arrange
  const input = formatCodeString(`
    Router.run(routes, Router.BrowserHistory, (Handler) => {
      render(<Handler/>, el);
    });
  `);

  const expected = formatCodeString(`
    import createBrowserHistory from 'history/lib/createBrowserHistory'
    let history = createBrowserHistory()
    render(<Router history={history}>{routes}</Router>, el)
  `);

  // act
  const result = visit(input, locationsVisitor);

  // assert
  assert.equal(formatCodeString(result), expected);
  assert.end();
});
