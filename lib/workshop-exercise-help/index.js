"use strict"

var resolve = require('path').resolve
var fs = require('fs')
var msee = require('msee')

module.exports = function(exercise) {
  var md = fs.readFileSync(resolve(exercise.dir, 'Readme.md'), 'utf8')
  md = '\n---\n' + md + '\n---'
  var out = '\n' + msee.parse(md, {
    paragraphStart: '',
    paragraphEnd: '\n\n'
  }).trimRight()
  return out
}
