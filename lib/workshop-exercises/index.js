var path = require('path')
var resolve = require('path').resolve
module.exports = function Exercises(exercises) {
  if (!exercises) throw new Error('Exercises needs exercises: ' + exercises)
  return exercises
  .map(function(d, index) {
    var data = {}
    data.name = path.basename(d)
    data.sequence = index
    data.dir = d
    return data
  })
  .filter(Boolean)
  .reduce(function(exercises, pkg, index, arr) {
    exercises[pkg.name] = pkg
    exercises[pkg.sequence] = pkg
    exercises.length = arr.length
    return exercises
  }, {})
}
