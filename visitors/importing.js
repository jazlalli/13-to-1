import template from 'babel-template';
import * as t from 'babel-types';

// just to see what I've got from babel-types
// Object.keys(t)
//   .filter(k => k.match(/^([a-z])+/igm))
//   .map(k => console.log(k));

const updateTopLevelVariableName = {
  Identifier(path) {
    let newVar = 'React' + this.variableName;

    if (path.node.name === this.variableName) {
      if (!path.scope.hasOwnBinding(newVar)) {
        path.node.name = newVar;
      }
    }
  }
}

const createRouterVariable = () => {
  const member = t.memberExpression(
    t.identifier('ReactRouter'), t.identifier('Router'));

  const declarator = t.variableDeclarator(
    t.identifier(importVariable()), member);

  const expression = t.variableDeclaration('var', [declarator]);
  return expression;
}


let set = false;
const variable = new Map();
const importVariable = value => {
  if (!value) {
    return variable.get('name');
  }

  if (set || typeof value !== 'string') {
    return;
  }

  if (value) {
    variable.set('name', value);
    set = true;
    return variable.get('name');
  }
}

module.exports = {
  CallExpression(path) {
    const parent = path.parentPath;
    const callee = path.node.callee.name;
    const arg = path.node.arguments[0].value;

    if (callee === 'require' && arg === 'react-router') {
      const declaration = parent.node.id;

      if (declaration) {
        const variableName = importVariable(declaration.name);
        parent.node.id.name = 'React' + variableName;
        path.traverse(updateTopLevelVariableName, {variableName});
      }
    }
  },

  MemberExpression(path) {
    const parent = path.parentPath;
    const variableName = importVariable();
    const initial = parent.node.init;

    if (initial) {
      const obj = initial.object;
      if (obj.name && obj.name === variableName) {
        obj.name = 'React' + obj.name;
        parent.parentPath.insertBefore(createRouterVariable());
      }
    }
  },

  ImportDeclaration(path) {
    const specifier = path.node.specifiers[0];
    const src = path.node.source;

    if (specifier && specifier.type === 'ImportDefaultSpecifier') {
      if (src.value === 'react-router') {
        let newSpecifier = t.Identifier(specifier.local.name);
        path.node.specifiers.pop();
        path.node.specifiers.push(t.ImportSpecifier(newSpecifier, newSpecifier));

        // i want to lookup usage of the original default import specifier, and use an appropriate ImportSpecifier instead. see test for failing example
      }
    }
  }

};