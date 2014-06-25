"use strict"

var env = process.env
var Workshop = require('./lib/workshop')

// load an equivalent workshop instance from current environment
// allows us to work with workshop without direct communication with
// subshell parent
var workshop = Workshop({
  name: env.WORKSHOP_NAME,
  workingDir: env.WORKSHOP_WORKING_DIR,
  exerciseDir: env.WORKSHOP_EXERCISE_DIR
})

module.exports = workshop
