#!/usr/bin/env node

var path = require('path')
var spawn = require('child_process').spawn

var exercises = require('./')
var exercise = exercises.getCurrent()

spawn(process.execPath, [path.resolve(exercise.dir, 'verify.js')], {
  stdio: 'inherit',
}).on('exit', function(code) {
  if (code !== 0) return process.exit(code)
  exercises.setComplete(exercise.name)

  if (exercises.allComplete()) {
    return process.exit(0)
  }
  exercises.setNext()
  spawn('help', [], {stdio: 'inherit'})
  .on('exit', function(code) {
    process.exit(1)
  })
})
