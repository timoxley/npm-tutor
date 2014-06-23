var path = require('path')
var fs = require('fs')

var mkdirp = require('mkdirp')

module.exports = function(namespace, dir) {
  if (!namespace) throw new Error('data namespace required')

  mkdirp.sync(dir)

  var file = path.resolve(dir, 'data.json')

  return {
    dir: dir,
    file: file,
    get: get,
    set: set,
    unset: unset,
    clear: clear
  }

  function get(name, defaultValue) {
    var data = read()
    if (!arguments.length) return data
    var value = data[name]
    if (value == null && arguments.length === 2) {
      return set(name, defaultValue)
    }
    return value
  }

  function set(name, value) {
    if (typeof value === 'function') value = value(get(name))
    var data = read()
    data[name] = value
    write(data)
    return value
  }

  function unset(name) {
    var data = {}
    try {
      data = JSON.parse(fs.readFileSync(file, 'utf8'))
    } catch (e) {}
    var value = data[name]
    delete data[name]
    write(data)
    return value
  }

  function clear() {
    var data = {}
    write(data)
    return data
  }

  function read() {
    var data = {}
    try {
      data = JSON.parse(fs.readFileSync(file, 'utf8'))
    } catch (e) {}
    return data || {}
  }

  function write(data) {
    fs.writeFileSync(file, JSON.stringify(data))
    return data
  }

  //function dataDir() {
    //return dataDir.dir = dataDir.dir || path.join(
      ////process.env.HOME || process.env.USERPROFILE,
      //process.cwd(),
      //'.'+namespace
      ////namespace
    //)
  //}
}

