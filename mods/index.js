import fs from 'fs';

const mods = {};
const exclude = 'index.js';

const dir = fs.readdirSync(__dirname);
const functions = dir
  .filter(file => file !== exclude)
  .map(file => require([__dirname, file].join('/')));

export default function (path) {
  functions
    .filter(f => typeof f === 'function')
    .forEach(f => f(path));
};
