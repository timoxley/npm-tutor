#!/usr/bin/env node

"use strict"

var adventure = require('adventure');
var spawn = require('child_process').spawn
var path = require('path')
var fs = require('fs')
var shell = require('shelljs')

module.exports = function(pkgDir) {
  var pkg = require(path.resolve(pkgDir, 'package.json'))
  var shop = adventure(pkg.description);
  pkg.exercises.map(function(exercise) {
    var dir = path.resolve(pkgDir, exercise)
    return {
      name: path.basename(exercise),
      pkgDir: pkgDir,
      dir: dir,
      problem: fs.readFileSync(path.resolve(dir, 'Readme.md')),
      pass: ' ',
      fail: ' ',
      verify: function(args, cb) {
        spawn(process.execPath, [path.resolve(dir, 'verify')].concat(args), {stdio: 'inherit'})
        .on('exit', function(code) {
          cb(code === 0)
        })
      }
    }
  }).forEach(function(exercise) {
    shop.add(exercise.name, function() { return exercise })
  })
  return shop
}
