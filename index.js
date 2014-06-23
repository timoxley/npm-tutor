"use strict"

var spawn = require('child_process').spawn
var j = require('path').resolve.bind(null, __dirname)
var fs = require('fs')

var tmp = require('quick-tmp')('npm-workshop')

var shell = process.platform === 'win32'
  ? process.env.ComSpec || 'cmd'
  : process.env.SHELL || 'bash'

var exercises = fs.readdirSync(j('exercises')).map(function(d) {return j('exercises', d)}).sort()
var data = require('./lib/data')
var currentExercise = data.get('current')


exercises[]

module.exports = function(dir, done) {
  if (!dir) dir = tmp()
  mkdir(dir)

  var args = []
  if (shell.match('bash')) args = ['--init-file', j('bin/npm-workshop-prelude.sh')]

  var child = spawn(shell, args, {
    env: augmentEnv(process.env),
    stdio: 'inherit',
    cwd: dir
  }).on('exit', done)
}

function augmentEnv(env) {
  env.PATH = [j('node_modules/.bin'), env.PATH].join(':')
  env.ZDOTDIR = j('bin')
  env.EXERCISE_DIR = j('exercises/00-welcome')
  return env
}

function mkdir(dir) {
  try {
    fs.mkdirSync(dir)
    return true
  } catch (e) {
    if (e.code !== 'EEXISTS') throw e
    return false
  }
}

