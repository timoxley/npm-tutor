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
        , x     : 3
        , y     : 2
      }, opts.menu))

  menu.reset()
  menu.write(chalk.bold(opts.title) + '\n')
  if (typeof opts.subtitle == 'string') menu.write(chalk.italic(opts.subtitle) + '\n')
  menu.write(repeat('\u2500', opts.width) + '\n')

  ;[].forEach.call(opts.exercises, function (exercise) {
    var name = exercise.name
    var isDone = (opts.completed.indexOf(name) >= 0)

    var message = chalk.bold('»') + ' ' + name
    var m = '[COMPLETED]'
    message += (isDone)
      ? repeat(' ', opts.width - m.length - name.length - 2) + m
      : repeat(' ', opts.width - name.length - 2)
    menu.add(message)
  })

  menu.write(repeat('\u2500', opts.width) + '\n')
  menu.add(chalk.bold('HELP'))

  menu.add(chalk.bold('EXIT MENU'))

  menu.on('select', function (label) {
    var name = chalk.stripColor(label)
                .replace(/(^»?\s+)|(\s+(\[COMPLETED\])?$)/g, '')

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
