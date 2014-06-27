#!/usr/bin/env node

console.log(require('msee').parseFile(__dirname + '/Readme.md', {
  paragraphStart: '',
  paragraphEnd: '\n\n'
}).trimRight())
console.log()
//require('workshop-exercises')()
