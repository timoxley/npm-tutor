"use strict"

var fs = require('fs')
var assert = require('assert')

process.on('uncaughtException', require('workshop-assertion-message'));

var target = path.resolve(process.cwd(), 'node_modules/once')
assert.ok(fs.existsSync(target), 'The once package must be installed!')
