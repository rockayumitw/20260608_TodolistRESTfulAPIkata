const crypto = require('crypto');

const todos = [
  {
    id: crypto.randomUUID(),
    title: 'test'
  }
];

module.exports = todos;