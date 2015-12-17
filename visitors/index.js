import fs from 'fs';

const exclude = 'index.js';

const dir = fs.readdirSync(__dirname);
const visitors = dir
  .filter(file => file !== exclude)
  .map(file => require([__dirname, file].join('/')));

export default visitors.filter(v => Object.keys(v).length);
