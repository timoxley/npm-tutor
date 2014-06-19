var path = require('path')
var fs = require('fs')

var mkdirp = require('mkdirp')
mkdirp.sync(dataDir())

var file = path.resolve(dataDir(), 'data.json')

function get(name, defaultValue) {
  var data = {}
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (e) {}
  if (data[data] == undefined && defaultValue !== undefined) set()
  return data[name]
}

function set(name, value) {
  if (typeof value === 'function') value = value(get(name))
  var data = {}
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (e) {}
  data[name] = value
  fs.writeFileSync(file, JSON.stringify(data))
}

function dataDir() {
  return dataDir.dir = dataDir.dir || path.join(
    process.env.HOME || process.env.USERPROFILE,
    '.config',
    'npm-workshop'
  )
}

module.exports = {
  get: get,
  set: set
}
