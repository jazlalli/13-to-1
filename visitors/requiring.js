import * as t from 'babel-types';

let set = false;
const variable = new Map();
const importVariable = value => {
  if (!value) {
    return variable.get('name');
  }

  if (set || typeof value !== 'string') {
    return null;
  }

  if (value) {
    variable.set('name', value);
    set = true;
    return variable.get('name');
  }
};

const updateTopLevelVariableName = {
  Identifier(path) {
    const newVar = 'React' + this.variableName;

    if (path.node.name === this.variableName) {
      if (!path.scope.hasOwnBinding(newVar)) {
        path.node.name = newVar;
      }
    }
  }
};

const createRouterVariable = () => {
  const member = t.memberExpression(
    t.identifier('ReactRouter'), t.identifier('Router'));

  const declarator = t.variableDeclarator(
    t.identifier(importVariable()), member);

  const expression = t.variableDeclaration('var', [declarator]);
  return expression;
};

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
  }
};
