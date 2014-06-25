"use strict"

var fs = require('fs')
var path = require('path')
var spawn = require('child_process').spawn

var j = path.resolve.bind(null, __dirname)
var pkg = require('./package.json')
var NAME = process.title = pkg.name
var PATH = detectPath()

var Workshop = require('./lib/workshop')

module.exports = function(dir, done) {
  var options = {
    name: NAME,
    workingDir: dir,
    exerciseDir: j('exercises'),
  }
  var workshop = Workshop(options)
  workshop.getCurrent()
  start(workshop, done)
}

function start(workshop, done) {
  var shell = detectShell()

  var args = []

  if (shell.match('bash')) args = ['--init-file', j('bin/npm-workshop-prelude.sh')]

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
  env.WORKSHOP_DIR = env.WORKSHOP_WORKING_DIR = workshop.workingDir
  env.WORKSHOP_EXERCISE_DIR = workshop.exerciseDir
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

function detectShell() {
  return process.platform === 'win32'
    ? process.env.ComSpec || 'cmd'
    : process.env.SHELL || 'bash'
}

function detectPath() {
  var PATH = 'PATH'
  // windows calls it's path "Path" usually, but this is not guaranteed.
  if (process.platform === "win32") {
    PATH = "Path"
    Object.keys(process.env).forEach(function (e) {
      if (e.match(/^PATH$/i)) {
        PATH = e
      }
    })
  }
  return PATH
}
var commandsPath = module.exports.commandsPath = j('commands')
module.exports.detectPath = detectPath
