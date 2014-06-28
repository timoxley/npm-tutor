#!/usr/bin/env node

var exercise = require('./').getCurrent()
var resolve = require('path').resolve
console.log(require('msee').parseFile(resolve(exercise.dir, 'Readme.md'), {
  paragraphStart: '',
  paragraphEnd: '\n\n'
}).trimRight())
console.log()
