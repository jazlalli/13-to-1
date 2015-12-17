import * as t from 'babel-types';

const createSpecifier = name => {
  const identifier = t.identifier(name);
  return t.importSpecifier(identifier, identifier);
};

const addImportSpecifier = {
  ImportDeclaration(path) {
    const property = this ? this.property : null;
    if (property) {
      const specs = path.node.specifiers;
      const imports = specs
                        .map(s => s.local.name)
                        .filter(s => s === property.name);

      if (imports.indexOf(property.name) < 0) {
        specs.push(createSpecifier(property.name));
      }
    }
  }
};

const destructureRouterProperties = {
  VariableDeclaration(path) {
    const property = this ? this.property : null;
    if (property) {
      path.remove();
      path.parentPath.traverse(addImportSpecifier, {property});
    }
  }
};

module.exports = {
  Program(path) {

    let importSpecifier = '';

    path.node.body.forEach(p => {
      if (p.type === 'ImportDeclaration') {
        const specifier = p.specifiers[0];
        const src = p.source;

        if (specifier && specifier.type === 'ImportDefaultSpecifier') {
          if (src.value === 'react-router') {
            importSpecifier = specifier.local.name;
            const variable = t.identifier(importSpecifier);

            p.specifiers.pop();
            p.specifiers.push(t.importSpecifier(variable, variable));
            path.traverse(addImportSpecifier, {property: variable});
          }
        }
      }


      if (p.type === 'VariableDeclaration') {
        const dec = p.declarations[0];

        if (dec && dec.init.type === 'MemberExpression') {
          const obj = dec.init.object.name;
          const property = t.identifier(dec.init.property.name);

          if (obj === importSpecifier) {
            path.traverse(destructureRouterProperties, {property});
          }
        }
      }
    });
  }
};
