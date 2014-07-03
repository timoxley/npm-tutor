"use strict"

if (!process.env['WORKSHOP_NAME']) return process.exit(1)

var path = require('path')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var exec = require('child_process').exec

function cpr(src, dest, fn) {
  rimraf.sync(dest)
  mkdirp.sync(dest)
  exec('cp -Rp ' + src + ' ' + dest, fn)
}

var dir = process.env['WORKSHOP_WORKING_DIR']
var lsDir = path.resolve(dir, 'npmls')

cpr(path.resolve(__dirname, 'bootstrap/npmls/*'), lsDir, function(err) {
  if (err) throw err
})
