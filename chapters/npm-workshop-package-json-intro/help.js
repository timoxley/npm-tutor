#!/usr/bin/env node

var exercise = require('./').getCurrent()
var resolve = require('path').resolve
var fs = require('fs')
var md = fs.readFileSync(resolve(exercise.dir, 'Readme.md'), 'utf8')
md = '\n---\n' + md + '\n---'
console.log(require('msee').parse(md, {
  paragraphStart: '',
  paragraphEnd: '\n\n'
}).trimRight())
console.log()
