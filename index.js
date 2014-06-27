"use strict"

var fs = require('fs')
var path = require('path')
var spawn = require('child_process').spawn

var j = path.resolve.bind(null, __dirname)
var pkg = require('./package.json')

var detectPath = require('./util').detectPath
var detectShell = require('./util').detectShell

var NAME = process.title = pkg.name
var TITLE = pkg.description
var EXERCISE_LIST = pkg.exercises

var PATH = detectPath()

var Workshop = require('./lib/workshop')

module.exports = function(dir, done) {
  var options = {
    name: NAME,
    title: TITLE,
    width: 80,
    workingDir: dir,
    exerciseList: EXERCISE_LIST.map(function(d) {
      return j(d)
    })
  }
  var workshop = Workshop(options)
  workshop.getCurrent()
  start(workshop, done)
}

function start(workshop, done) {
  var shell = detectShell()

  var args = []

  if (shell.match('bash')) args = ['--init-file', j('bin/prelude.sh')]

  var child = spawn(shell, args, {
    env: augmentEnv(process.env, workshop),
    stdio: 'inherit',
    cwd: workshop.workingDir
  }).on('exit', done)
}

function augmentEnv(env, workshop) {
  env[PATH] = [commandsPath, j('node_modules/.bin'), env[PATH]].join(':')
  env.ZDOTDIR = j('bin')
  env.WORKSHOP_NAME = workshop.name
  env.WORKSHOP_TITLE = workshop.title
  env.WORKSHOP_SUBTITLE = workshop.subtitle
  env.WORKSHOP_WIDTH = workshop.width
  env.WORKSHOP_DIR = env.WORKSHOP_WORKING_DIR = workshop.workingDir
  env.WORKSHOP_EXERCISE_LIST = JSON.stringify(workshop.exerciseList)
  env.WORKSHOP_BIN_DIR = workshop.binDir
  // ensure ctrl + arrow keys etc continue functioning
  var inputrc = env.INPUTRC
  if (!inputrc) {
    if (fs.existsSync('/etc/inputrc')) inputrc = '/etc/inputrc'
    if (fs.existsSync(env.HOME + '/.inputrc')) inputrc = '~/.inputrc'
  }
  env.INPUTRC = inputrc
  return env
}

var commandsPath = module.exports.commandsPath = j('commands')
