"use strict"

var exec = require('child_process').exec
var url = 'http://nodejs.org/dist/latest/SHASUMS.txt'

module.exports = function(fn) {
  exec('npm info npm dist-tags.latest --no-color', function(err, stdout) {
    fn(err, stdout.trim())
  })
}
