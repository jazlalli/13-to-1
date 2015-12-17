module.exports = {
  JSXOpeningElement(path) {
    if (path.node.name.name === 'Route') {
      path.node.attributes = path.node.attributes
        .filter(a => a.name.name !== 'name');

      path.node.attributes = path.node.attributes
        .map(a => {
          if (a.name.name === 'handler') {
            a.name.name = 'component';
          }

          return a;
        });
    }
  }
};
