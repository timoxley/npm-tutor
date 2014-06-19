#!/usr/bin/env node

"use strict"

var args = process.argv.slice(2)

var workshop = require('../')

workshop(process.argv[3], function(code) {
  console.info('Goodbye!', code)
  process.exit(code)
})
