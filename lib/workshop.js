"use strict"

var tmp = require('quick-tmp')

var Data = require('./data')
var Sequence = require('./sequence')
var Exercises = require('./exercises')

module.exports = function(name, exerciseDir) {
  var data = Data(name)
  var exercises = Exercises(exerciseDir)
  var sequence = Sequence(exercises, data)
  var workshop = Object.create(sequence)
  workshop.data = data
  workshop.exercises = exercises
  workshop.workingDir = getWorkingDir(name, data)
  return workshop
}

function getWorkingDir(name, data) {
  return data.get('working-dir', tmp(name))
}

