"use strict"

var env = process.env
var Workshop = require('./lib/workshop')

var workshop = Workshop({
  name: env.WORKSHOP_NAME,
  workingDir: env.WORKSHOP_WORKING_DIR,
  exerciseDir: env.WORKSHOP_EXERCISE_DIR
})

module.exports = workshop
