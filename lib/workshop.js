"use strict"

var tmp = require('quick-tmp')

var Data = require('./data')
var Sequence = require('./sequence')
var Exercises = require('./exercises')
var mkdirp = require('mkdirp')

module.exports = function(options) {
  options = options || {}
  var name = options.name
  var exerciseDir = options.exerciseDir
  var workingDir = options.workingDir
  var data = Data(name)
  var exercises = Exercises(exerciseDir)
  var sequence = Sequence(exercises, data)
  var workshop = Object.create(sequence)
  workshop.data = data
  workshop.exercises = exercises
  workshop.workingDir = workingDir || getWorkingDir(name, data)
  mkdirp.sync(workshop.workingDir)
  return workshop
}

function getWorkingDir(name, data) {
  return data.get('working-dir', tmp(name))
}
