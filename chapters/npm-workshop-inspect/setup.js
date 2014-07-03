"use strict"

if (!process.env['WORKSHOP_NAME']) return process.exit(1)

var path = require('path')
var cpr = require('cpr')
var dir = process.env['WORKSHOP_WORKING_DIR']

var npmlsDir = path.resolve(dir, 'npmls')

cpr(path.resolve(__dirname, 'bootstrap/npmls'), npmlsDir, {
  overwrite: true, //If the file exists, overwrite it
  confirm: true
}, function(err, files) {
  if (err) throw err
})
