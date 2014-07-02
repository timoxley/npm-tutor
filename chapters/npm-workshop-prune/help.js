#!/usr/bin/env node

var exercise = require('./').getCurrent()
console.log(require('workshop-exercise-help')(exercise))
