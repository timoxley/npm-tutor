#!/usr/bin/env node

console.log(require('msee').parseFile(__dirname + '/index.md', {
  paragraphStart: '',
  paragraphEnd: '\n\n'
}).trimRight())
console.log()
