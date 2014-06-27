"use strict"

var env = process.env
var Workshop = require('./lib/workshop')

// load an equivalent workshop instance from current environment
// allows us to work with workshop without direct communication with
// subshell parent
var exerciseList = env.WORKSHOP_EXERCISE_LIST || '[]'
if (exerciseList[0] !== '[') exerciseList = '[]'

var workshop = Workshop({
  name: env.WORKSHOP_NAME,
  title: env.WORKSHOP_TITLE,
  subtitle: env.WORKSHOP_SUBTITLE,
  width: env.WORKSHOP_WIDTH,
  workingDir: env.WORKSHOP_WORKING_DIR,
  dataDir: env.WORKSHOP_DATA_DIR,
  exerciseList: JSON.parse(exerciseList)
})

module.exports = workshop
