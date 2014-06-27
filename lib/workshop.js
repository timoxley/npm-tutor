var resolve = require('path').resolve
var Data = require('./data')
var Sequence = require('./sequence')
var Exercises = require('./exercises')
var mkdirp = require('mkdirp')
var spawn = require('child_process').spawn
var tmp = require('quick-tmp')
var once = require('once')
var messages = require('../messages')
var detectPath = require('../util').detectPath
var commandsPath = require('../').commandsPath
var showMenu = require('./menu')
var ansi = require('ansi')

module.exports = function Workshop(options) {
  options = options || {}
  var name = options.name || process.title

  var dataDir = getDataDir(name)
  mkdirp.sync(dataDir)
  var data = Data(name, dataDir)

  var workingDir = options.workingDir || data.get('workingDir', tmp(options.name)())

  mkdirp.sync(workingDir)

  var rootDir = options.rootDir || resolve(workingDir, '.' + name)


  var binDir = resolve(rootDir, 'bin')
  mkdirp.sync(binDir)
  var data = Data(name, dataDir)

  var exercises = Exercises(options.exerciseList, function() {
    return name.replace()
  })
  var sequence = Sequence(exercises, data)
  var workshop = Object.create(sequence)


  workshop.width = Number(options.width) || 80
  workshop.subtitle = options.subtitle || '\x1b[23mSelect an exercise and hit \x1b[3mEnter\x1b[23m to begin' 
  workshop.title = options.title

  workshop.data = data
  workshop.exercises = exercises
  workshop.exerciseList = options.exerciseList
  workshop.workingDir = workingDir
  workshop.rootDir = rootDir
  workshop.dataDir = dataDir
  workshop.binDir = binDir
  mkdirp.sync(workshop.workingDir)

  workshop.start = start
  workshop.remove = remove
  workshop.prune = prune
  workshop.verify = verify
  workshop.next = next
  workshop.prev = prev
  workshop.go = go
  workshop.complete = complete
  workshop.isComplete = isComplete
  workshop.reset = reset
  workshop.forwardExec = forwardExec
  workshop.toDo = toDo
  workshop.clear = clear
  workshop.printMenu = printMenu

  return workshop
}

var STDIO = ['pipe', process.stdout, 'pipe']

function clear(done) {
  done = done || errFn
  done = once(done)
  var workshop = this
  spawn('clear', [], {
    env: augmentEnv(process.env, workshop),
    stdio: STDIO,
    cwd: resolve(__dirname, '..')
  })
  .on('exit', function(code) {
    done(null, code)
  })
  .on('error', function() {
    return done(err)
  })
}

function start(done) {
  done = done || errFn
  done = once(done)
  var workshop = this
  workshop.clear(function() {
    spawn('npm', ['install', workshop.getCurrent().dir], {
      env: augmentEnv(process.env, workshop),
      stdio: STDIO,
      killSignal: 'SIGTERM',
      cwd: resolve(__dirname, '..')
    }).on('exit', function(code) {
      // remove npm install output
      var cursor = ansi(process.stdout)
      cursor.up(1)
      cursor.eraseLine()
      done(null, code)
    })
    .on('error', function() {
      return done(err)
    })
  })
}

function remove(done) {
  done = done || errFn
  this.prune(done)
}

function prune(done) {
  done = done || errFn
  done = once(done)
  spawn('npm', ['prune'], {
    env: augmentEnv(process.env, this),
    stdio: STDIO,
    cwd: resolve(__dirname, '..')
  }).on('exit', function(code) {
    done(null, code)
  })
  .on('error', function() {
    return done(err)
  })
}

function verify(args, done) {
  var workshop = this
  done = done || errFn
  var current = workshop.getCurrent()
  forwardExec('verify', args, function(err, code) {
    if (err) return done(err)
    if (code !== 0) return done(null, false)
    workshop.complete(current.name, function(err) {
      if (err) return done(err)
      return done(null, true)
    })
  })
}

function next(done) {
  done = done || errFn
  var workshop = this
  workshop.remove(function(err) {
    if (err) return done(err)
    var prev = workshop.getCurrent()
    workshop.setNext()
    workshop.start(function(err) {
      if (err) return done(err)
      done(null, prev)
    })
  })
}

function prev(done) {
  done = done || errFn
  var workshop = this
  workshop.remove(function(err) {
    if (err) return done(err)
    workshop.setPrev()
    workshop.start(done)
  })
}


function go(exerciseName, done) {
  done = done || errFn
  var workshop = this
  var exercise = workshop.exercises[exerciseName]
  workshop.remove(function(err) {
    if (err) return done(err)
    workshop.setCurrent(exercise.name)
    workshop.start(done)
  })
}

function reset(done) {
  done = done || errFn
  this.data.clear()
  this.start(done)
}

function complete(name, done) {
  done = done || errFn
  setComplete(this.data, name)
  done()
}

function setComplete(data, name) {
  return data.set('completed', function(completed) {
    completed = completed || []
    return completed.concat(name)
  })
}

function isComplete(name) {
  var completed = this.data.get('completed', [])
  return completed.indexOf(name) !== -1
}

function forwardExec(command, args, done) {
  done = done || errFn
  done = once(done)
  var PATH = process.env[detectPath()]
  PATH = PATH.split(':').filter(function(p) {
    return p != commandsPath
  }).join(':')
  process.env[detectPath()] = PATH
  spawn(command, args, {
    env: augmentEnv(process.env, this),
    stdio: STDIO,
    cwd: resolve(__dirname, '..')
  }).on('exit', function(code) {
    return done(null, code)
  })
  .on('error', function(err) {
    return done(err)
  })
}

function errFn(err) {
  if (err) {
    if (!err.stack) console.trace()
    throw err
  }
}

function toDo() {
  var completed = 0
  var all = [].map.call(this.exercises, function(exercise) {
    return exercise.name
  }).filter(uniq)
  all = all.sort()

  var complete = this.data.get('completed', []).filter(uniq)
  complete = complete.sort()
  return all.filter(function(name) {
    return complete.indexOf(name) === -1
  })
}

function uniq(name, index, arr) {
  return index === arr.indexOf(name)
}

function augmentEnv(env, workshop) {
  env.npm_config_loglevel = "silent"
  return env
}

function getDataDir(namespace) {
  return getDataDir.dir = getDataDir.dir || resolve(
    process.env.HOME || process.env.USERPROFILE,
    '.'+namespace
  )
}

function printMenu() {
  var workshop = this
  var menu = showMenu({
    name: this.name,
    title: this.title,
    subtitle: this.subtitle,
    width: this.width,
    completed: this.data.get('completed', []),
    exercises: this.exercises,
  }).on('select', function(name) {
    require('../commands/goto')(name)
  }).on('help', function(name) {
    console.log(messages['help'])
  })
}
