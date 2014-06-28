var chalk = require('chalk')

module.exports = function(err) {
  if (err.name !== 'AssertionError') throw err
  console.log(chalk.red(err.message))
  process.exit(err.code || 1)
}
