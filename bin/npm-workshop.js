#!/usr/bin/env node

"use strict"

var args = process.argv.slice(2)
var workshop = require('../')

if (process.env['WORKSHOP_NAME']) {
  var help = require('../commands/helpme')
  help.done = function() {
    process.exit(1)
  }
  return help()
}

workshop(process.argv[3], function(code) {
  console.info('\nGoodbye!\n')
  process.exit(code)
})
