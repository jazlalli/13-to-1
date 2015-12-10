import * as t from 'babel-types';

module.exports = {
  JSXAttribute(path) {
    // rename handler to component
    if (path.node.name.name === 'handler') {
      path.replaceWith(
        t.jSXAttribute(t.jSXIdentifier('component'), path.node.value)
      );
    }

    // remove name
    if (path.node.name.name === 'name') {
      path.remove();
    }
  }
};