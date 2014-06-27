var fs = require('fs')
var resolve = require('path').resolve

module.exports = function Exercises(exercises) {
  if (!exercises) throw new Error('Exercises needs exercises: ' + exercises)
  return exercises
  .map(function(d, index) {
    try {
      var data = JSON.parse(fs.readFileSync(resolve(d, 'package.json'), 'utf8'))
    } catch (e) {
      return null
    }
    data.sequence = index
    data.dir = d
    return data
  })
  .filter(Boolean)
  .reduce(function(exercises, pkg, index, arr) {
    var name = pkg.name
    if (pkg.description && pkg.description.indexOf(':') !== -1) {
      name = pkg.description.split(':')[0]
      pkg.name = name
    }
    exercises[name] = pkg
    exercises[pkg.sequence] = pkg
    exercises.length = arr.length
    return exercises
  }, {})
}
