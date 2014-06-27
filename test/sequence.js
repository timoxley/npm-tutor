"use strict"

var test = require('tape')

var rimraf = require('rimraf')
var mkdirp = require('mkdirp')

var fs = require('fs')
var resolve = require('path').resolve

var tmpDir = require('quick-tmp')('test-exercises')

var Exercises = require('workshop-exercises')
var Data = require('workshop-data')
var Sequence = require('workshop-sequence')

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
  var dataDir = resolve(dir, 'data')
  mkdirp.sync(dataDir)
  var exerciseDir = resolve(dir, 'exercises')
  mkdirp.sync(exerciseDir)
  var pkgDir1 = resolve(exerciseDir, '01-first')
  var pkgDir2 = resolve(exerciseDir, '02-second')
  var pkgDir3 = resolve(exerciseDir, '03-third')
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
  exercises = Exercises([pkgDir1, pkgDir2, pkgDir3])
  data = Data('test-data', dataDir)
  data.clear()
}

function teardown() {
  setup.dir && rimraf.sync(setup.dir)
}

test('can get current exercise', function(t) {
  setup()
  var sequence = Sequence(exercises, data)
  var currentExercise = sequence.getCurrent()
  t.deepEqual(currentExercise, exercises[0])
  t.end()
  teardown()
})

test('can set current exercise', function(t) {
  setup()
  var sequence = Sequence(exercises, data)
  sequence.setCurrent(exercises[1].name)
  t.deepEqual(sequence.getCurrent(), exercises[1])
  t.end()
  teardown()
})

test('can get next exercise', function(t) {
  setup()
  var sequence = Sequence(exercises, data)
  t.deepEqual(sequence.getNext(), exercises[1])
  sequence.setCurrent(exercises[1].name)
  t.deepEqual(sequence.getNext(), exercises[2])
  sequence.setCurrent(exercises[2].name)
  t.deepEqual(sequence.getNext(), exercises[2], 'should not go past end')
  t.end()
  teardown()
})

test('can get prev exercise', function(t) {
  setup()
  var sequence = Sequence(exercises, data)
  t.deepEqual(sequence.getPrev(), exercises[0], 'should not go past start')
  sequence.setCurrent(exercises[1].name)
  t.deepEqual(sequence.getPrev(), exercises[0])
  sequence.setCurrent(exercises[2].name)
  t.deepEqual(sequence.getPrev(), exercises[1])
  t.end()
  teardown()
})

test('can set next exercise', function(t) {
  setup()
  var sequence = Sequence(exercises, data)
  t.deepEqual(sequence.setNext(), exercises[1])
  t.deepEqual(sequence.setNext(), exercises[2])
  t.deepEqual(sequence.setNext(), exercises[2], 'should not go past end')
  t.end()
  teardown()
})

test('can set prev exercise', function(t) {
  setup()
  var sequence = Sequence(exercises, data)
  sequence.setCurrent(exercises[2].name)
  t.deepEqual(sequence.setPrev(), exercises[1])
  t.deepEqual(sequence.setPrev(), exercises[0])
  t.deepEqual(sequence.setPrev(), exercises[0], 'should not go past start')
  t.end()
  teardown()
})


