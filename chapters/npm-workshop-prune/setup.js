"use strict"

if (!process.env['WORKSHOP_NAME']) return process.exit(1)

var path = require('path')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var cpr = require('cpr')
var dir = process.env['WORKSHOP_WORKING_DIR']
var pruneDir = path.resolve(dir, 'prune')
var exec = require('child_process').exec

var dedupeDir = path.resolve(dir, 'dedupe')
var updateDir = path.resolve(dir, 'update')
var shrinkwrapDir = path.resolve(dir, 'shrinkwrap')

rimraf.sync(pruneDir)
mkdirp.sync(pruneDir)

cpr(path.resolve(__dirname, 'bootstrap/prune'), pruneDir, {
  deleteFirst: true, //Delete "to" before
  overwrite: true, //If the file exists, overwrite it
  confirm: true
}, function(err, files) {
  if (err) throw err
})

cpr(path.resolve(__dirname, 'bootstrap/dedupe'), dedupeDir, {
  deleteFirst: true, //Delete "to" before
  overwrite: true, //If the file exists, overwrite it
  confirm: true
}, function(err, files) {
  if (err) throw err
})

cpr(path.resolve(__dirname, 'bootstrap/update'), updateDir, {
  deleteFirst: true, //Delete "to" before
  overwrite: true, //If the file exists, overwrite it
  confirm: true
}, function(err, files) {
  if (err) throw err
})

cpr(path.resolve(__dirname, 'bootstrap/shrinkwrap'), shrinkwrapDir, {
  deleteFirst: true, //Delete "to" before
  overwrite: true, //If the file exists, overwrite it
  confirm: true
}, function(err, files) {
  if (err) throw err
})
