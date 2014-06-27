"use strict"

var test = require('tape')

var rimraf = require('rimraf')
var mkdirp = require('mkdirp')

var fs = require('fs')
var resolve = require('path').resolve

var tmpDir = require('quick-tmp')('test-exercises')

var Exercises = require('workshop-exercises')

function tmp() {
  var dir = tmpDir()
  mkdirp.sync(dir)
  return dir
}

function writePkg(dir, pkg) {
  var file = resolve(dir, 'package.json')
  mkdirp.sync(dir)
  fs.writeFileSync(file, JSON.stringify(pkg))
  return pkg
}

test('can list all exercises in order', function(t) {
  var dir = tmp()
  var pkgDir1 = resolve(dir, '01-first')
  var pkgDir2 = resolve(dir, '02-second')
  var pkgDir3 = resolve(dir, '03-third')
  var pkg1 = {
    name: "first"
  }
  var pkg2 = {
    name: "second"
  }
  var pkg3 = {
    name: "third"
  }

  writePkg(pkgDir1, pkg1)
  writePkg(pkgDir2, pkg2)
  writePkg(pkgDir3, pkg3)

  var exercises = Exercises([pkgDir1, pkgDir2, pkgDir3])
  // ensure numeric indices work
  t.equal(exercises[0].name, pkg1.name)
  t.equal(exercises[1].name, pkg2.name)
  t.equal(exercises[2].name, pkg3.name)

  // ensure length is correct
  t.equal(exercises.length, 3)

  // ensure sequence is added
  t.equal(exercises[pkg1.name].sequence, 0)
  t.equal(exercises[pkg2.name].sequence, 1)
  t.equal(exercises[pkg3.name].sequence, 2)

  // ensure pkg dir exists
  t.equal(exercises[pkg1.name].dir, pkgDir1)
  t.equal(exercises[pkg2.name].dir, pkgDir2)
  t.equal(exercises[pkg3.name].dir, pkgDir3)

  t.end()
  rimraf.sync(dir)
})
