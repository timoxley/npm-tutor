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
var pruneDir = path.resolve(dir, 'prune')
var dedupeDir = path.resolve(dir, 'dedupe')
var updateDir = path.resolve(dir, 'update')
var shrinkwrapDir = path.resolve(dir, 'shrinkwrap')

cpr(path.resolve(__dirname, 'bootstrap/prune/*'), pruneDir, function(err) {
  if (err) throw err
})

cpr(path.resolve(__dirname, 'bootstrap/dedupe/*'), dedupeDir, function(err) {
  if (err) throw err
})

cpr(path.resolve(__dirname, 'bootstrap/update/*'), updateDir, function(err) {
  if (err) throw err
})

cpr(path.resolve(__dirname, 'bootstrap/shrinkwrap/*'), shrinkwrapDir, function(err) {
  if (err) throw err
})
