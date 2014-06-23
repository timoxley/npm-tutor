"use strict"

var spawn = require('child_process').spawn
var path = require('path')
var j = path.resolve.bind(null, __dirname)
var fs = require('fs')
var tmp = require('quick-tmp')

var NAME = 'npm-workshop'
var PATH = detectPath()

var Workshop = require('./lib/workshop')

module.exports = function(dir, done) {
  var workingDir = dir || tmp(NAME)()
  var options = {
    name: NAME,
    workingDir: workingDir,
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
  env[PATH] = [j('node_modules/.bin'), j('aliases'), env.PATH].join(':')
  env.ZDOTDIR = j('bin')
  env.WORKSHOP_NAME = workshop.name
  env.WORKSHOP_WORKING_DIR = workshop.workingDir
  env.WORKSHOP_EXERCISE_DIR = workshop.exerciseDir
  env.WORKSHOP_BIN_DIR = workshop.binDir
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
