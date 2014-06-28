var Data = require('workshop-data')
var Exercises = require('workshop-exercises')
var Sequence = require('workshop-sequence')
var resolve = require('path').resolve

var pkg = require('./package.json')
var exercises = Exercises(pkg.exercises.map(function(d) {
  return resolve(__dirname, d)
}))
var data = Data(pkg.name, process.env.WORKSHOP_DATA_DIR)
var sequence = Sequence(exercises, data)
module.exports = sequence
