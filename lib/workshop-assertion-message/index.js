"use strict"

var chalk = require('chalk')

module.exports = function(err) {
  if (err.name !== 'AssertionError') throw err
  var lines = err.message.split('\n')
  console.log(chalk.red(chalk.stripColor(lines[0])))
  console.log(lines.slice(1).join('\n'))
  process.exit(1)
}
