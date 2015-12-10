import template from 'babel-template';
import * as t from 'babel-types';

// just to see what I've got from babel-types
Object.keys(t)
  .filter(k => k.match(/^([a-z])+/igm))
  .map(k => console.log(k));

const updateVariableNameVisitor = {
  Identifier(path) {
    if (path.node.name === this.variableName) {
      path.node.name = 'React' + this.variableName;
    }
  }
}

const updateMemberExpressionVisitor = {
  MemberExpression(path) {
    if (path.node.name === this.variableName) {
      path.node.name = 'ReactRouter';
    }
  }
}

const createRouterVariable = () => {
  var declarator = t.variableDeclarator(t.identifier(importVariable()));
  var variable = t.variableDeclaration('var', [declarator]);
  var member = t.memberExpression(t.identifier('ReactRouter'), t.identifier('Router'));

  const expression = t.assignmentExpression('=', declarator, member);

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
        path.traverse(updateVariableNameVisitor, {variableName});
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