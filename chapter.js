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
  var exercises = []
  if (pkg.exercises && !Array.isArray(pkg.exercises)) {
    exercises = Object.keys(pkg.exercises).map(function(key) {
      return {
        name: key,
        dir: path.resolve(pkgDir, pkg.exercises[key])
      }
    })
  } else {
    exercises = exercises.map(function() {
      return {
        name: path.basename(dir),
        dir: path.resolve(pkgDir, exercise)
      }
    })
  }

  exercises.map(function(exercise) {
    var dir = exercise.dir
    return {
      name: exercise.name,
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
  })
  .forEach(function(exercise) {
    shop.add(exercise.name, function() { return exercise })
  })
  return shop
}
