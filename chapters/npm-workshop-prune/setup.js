"use strict"

var path = require('path')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var cpr = require('cpr')
var dir = process.env['WORKSHOP_WORKING_DIR']
var pruneDir = path.resolve(dir, 'prune')
var exec = require('child_process').exec

var dedupeDir = path.resolve(dir, 'dedupe')

rimraf.sync(pruneDir)
mkdirp.sync(pruneDir)

cpr(path.resolve(__dirname, 'bootstrap/prune'), pruneDir, {
  deleteFirst: true, //Delete "to" before
  overwrite: true, //If the file exists, overwrite it
  confirm: true
}, function(err, files) {
  if (err) throw err
  exec('npm install --silent', {cwd: pruneDir}, function(err) {
    if (err) throw err
  })
})

cpr(path.resolve(__dirname, 'bootstrap/dedupe'), dedupeDir, {
  deleteFirst: true, //Delete "to" before
  overwrite: true, //If the file exists, overwrite it
  confirm: true
}, function(err, files) {
  if (err) throw err
  exec('npm install --silent', {cwd: dedupeDir}, function(err) {
    if (err) throw err
  })
})
