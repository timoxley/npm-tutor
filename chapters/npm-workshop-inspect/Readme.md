# npm install #

NPM INSTALL

  inquirer.prompt([{
      'type': 'confirm'
    , 'name': 'ok'
    , 'default': true
    , 'message': wordwrap(4, 80)(
      "We're about to populate this directory with some code for you to " +
      "use for your answers. If they've already been created then don't worry, " +
      "they won't be replaced. Continue?"
    ).replace(/^\s+/, '')
  }], function(result) {
    if (!result.ok) return process.exit(1)
    console.error()

    exercises.forEach(createExercise)
    if (!counter) return done && done()
  })
