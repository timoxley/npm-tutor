"use strict"

var resolve = require('path').resolve
var Data = require('./data')
var Sequence = require('./sequence')
var Exercises = require('./exercises')
var mkdirp = require('mkdirp')

module.exports = function(options) {
  options = options || {}
  var name = options.name
  var exerciseDir = options.exerciseDir
  var workingDir = options.workingDir

  mkdirp.sync(workingDir)

  var rootDir = options.rootDir || resolve(workingDir, '.' + name)

  var dataDir = resolve(rootDir, 'data')
  mkdirp.sync(dataDir)
  var data = Data(name, dataDir)

  var binDir = resolve(rootDir, 'bin')
  mkdirp.sync(binDir)
  var data = Data(name, dataDir)

  var exercises = Exercises(exerciseDir)
  var sequence = Sequence(exercises, data)
  var workshop = Object.create(sequence)
  workshop.data = data
  workshop.exercises = exercises
  workshop.exerciseDir = exerciseDir
  workshop.workingDir = workingDir
  workshop.rootDir = rootDir
  workshop.dataDir = dataDir
  workshop.binDir = binDir
  mkdirp.sync(workshop.workingDir)

  workshop.start = start
  workshop.remove = remove
  return workshop
}

var spawn = require('child_process').spawn

function start(done) {
  done = done || function() {}
  spawn('npm', ['install', this.getCurrent().dir], {
    env: process.env,
    stdio: 'inherit',
    cwd: resolve(__dirname, '..')
  }).on('exit', done)
}

function remove(done) {
  done = done || function() {}
  spawn('npm', ['uninstall', this.getCurrent().name], {
    env: process.env,
    stdio: 'inherit',
    cwd: resolve(__dirname, '..')
  }).on('exit', done)
}
