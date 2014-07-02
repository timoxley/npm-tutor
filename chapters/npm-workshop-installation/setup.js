"use strict"

if (!process.env['WORKSHOP_NAME']) return process.exit(1)

var path = require('path')
var mkdirp = require('mkdirp')
var cpr = require('cpr')
var rimraf = require('rimraf')
var dir = path.resolve(process.env['WORKSHOP_WORKING_DIR'])
var exec = require('child_process').exec

cpr(path.resolve(__dirname, 'bootstrap'), dir, {
    overwrite: true, //If the file exists, overwrite it
}, function(err, files) {
  if (err) throw err
    exec('npm install ./bower', {cwd: path.resolve(dir, 'uninstall')}, function(err) {
      if (err) throw err
      rimraf.sync(path.resolve(dir, 'uninstall/bower'))
    })
})
