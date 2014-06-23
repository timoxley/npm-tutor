"use strict"

var test = require('tape')

var rimraf = require('rimraf')
var mkdirp = require('mkdirp')

var fs = require('fs')
var resolve = require('path').resolve

var tmpDir = require('quick-tmp')('test-exercises')

var Workshop = require('../lib/workshop')

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

var data, exercises;

function setup() {
  var dir = setup.dir = tmp()
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
}

function teardown() {
  setup.dir && rimraf.sync(setup.dir)
}

test('accepts/creates a working dir', function(t) {
  setup()
  var workingDir = tmpDir()
  t.ok(!fs.existsSync(workingDir))
  var workshop = Workshop({name: 'test-workshop', exerciseDir: setup.dir, workingDir: workingDir})
  t.equal(workshop.workingDir, workingDir)
  t.ok(fs.existsSync(workingDir))
  t.end()
  teardown()
})

test('creates/restores working dir', function(t) {
  setup()
  var workshop1 = Workshop({name: 'test-workshop', exerciseDir: setup.dir})
  var dir1 = workshop1.workingDir
  t.ok(dir1)

  var workshop2 = Workshop({name: 'test-workshop', exerciseDir: setup.dir})
  var dir2 = workshop2.workingDir
  t.equal(dir2, dir1)

  t.end()
  teardown()
})

test('restores current exercise', function(t) {
  setup()
  var workshop1 = Workshop({name: 'test-workshop', exerciseDir: setup.dir})
  var current1 = workshop1.getCurrent()
  t.ok(current1)

  var workshop2 = Workshop({name: 'test-workshop', exerciseDir: setup.dir})
  var current2 = workshop2.getCurrent()
  t.deepEqual(current2, current1)
  t.end()
  teardown()
})
