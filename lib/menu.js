const tmenu        = require('terminal-menu')
    , path         = require('path')
    , fs           = require('fs')
    , xtend        = require('xtend')
    , EventEmitter = require('events').EventEmitter
    , chalk        = require('chalk')

function repeat (ch, sz) {
  return new Array(sz + 1).join(ch)
}

function showMenu (opts) {
  var emitter  = new EventEmitter()
    , menu     = tmenu(xtend({
          width : opts.width
        , fg    : 'black'
        , bg    : 'magenta'
        , x     : 3
        , y     : 2
      }, opts.menu))

  menu.reset()
  menu.write(chalk.inverse.black('' + opts.title + '') + '\n')
  if (typeof opts.subtitle == 'string') menu.write(chalk.white.italic(opts.subtitle) + '\n')
  menu.write(repeat('\u2500', opts.width) + '\n')

  ;[].forEach.call(opts.exercises, function (exercise) {
    var name = exercise.name
    var message = chalk.white.bold('»') + ' ' + name
    var isDone = (opts.completed.indexOf(name) >= 0)
    var m = isDone ? '[COMPLETED]' : ''
    if (exercise.completed) {
      if (exercise.completed > 0 && exercise.completed < 100) m = '['+exercise.completed+'%]'
    }

    var message = chalk.white.bold('»') + ' ' + chalk.white(name)
    message += repeat(' ', opts.width - m.length - name.length - 2) + chalk.white(m)
    menu.add(message)
  })

  menu.write(repeat('\u2500', opts.width) + '\n')
  menu.add(chalk.white.bold('HELP'))

  menu.add(chalk.white.bold('EXIT MENU'))

  menu.on('select', function (label) {
    var name = chalk.stripColor(label)
                .replace(/(^»?\s+)|(\s+(\[.*\])?$)/g, '')

    menu.y = 0
    menu.reset()
    menu.close()

    if (name === 'EXIT MENU')
      return emitter.emit('exit')

    if (name === 'HELP')
      return emitter.emit('help')

    //if (opts.extras.indexOf(name.toLowerCase()) != -1)
      //return emitter.emit('extra-' + name.toLowerCase())

    emitter.emit('select', name)
  })

  menu.createStream().pipe(process.stdout)

  return emitter
}


module.exports = showMenu
