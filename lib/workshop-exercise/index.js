"use strict"

var path = require('path')
var Data = require('workshop-data')
var Exercises = require('workshop-exercises')
var Sequence = require('workshop-sequence')
var resolve = require('path').resolve

module.exports = function(pkgjson) {
  var pkg = require(pkgjson)
  var dir = path.dirname(pkgjson)
  var exercises = Exercises(pkg.exercises.map(function(d) {
    return resolve(dir, d)
  }))
  var data = Data(pkg.name, process.env.WORKSHOP_DATA_DIR)
  return Sequence(exercises, data)
}
