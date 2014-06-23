var fs = require('fs')
var resolve = require('path').resolve

module.exports = function(exerciseDir) {
  return fs.readdirSync(exerciseDir)
  .map(function(d) {return resolve(exerciseDir, d)})
  .sort()
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
    exercises[pkg.name] = pkg
    exercises[pkg.sequence] = pkg
    exercises.length = arr.length
    return exercises
  }, {})
}
