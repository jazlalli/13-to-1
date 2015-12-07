import {parse} from 'babylon';
import traverse from 'babel-traverse';
import generate from 'babel-generator';
import runAllMods from './mods';

const code = `
  import Router from 'react-router';
  const {Route} = Router;
  const DefaultRoute = Router.DefaultRoute;

  const routes = (
    <Route>
      <Route name="app" path="/" handler={App}>
        <DefaultRoute name="login" handler={Login} />
        <Route name="home" path="home" handler={Home} />
      </Route>
    </Route>
  );
`

const visitors = {enter: runAllMods};
const ast = parse(code, {sourceType: 'module', plugins: ['jsx']});

traverse(ast, visitors);

const output = generate(ast, {
  concise: false,
  quotes: 'single',
  compact: false
}, code);

console.log(output.code);