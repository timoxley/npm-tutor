#!/usr/bin/env node

"use strict"

var fs = require('fs')
var path = require('path')
var spawn = require('child_process').spawn
var adventure = require('adventure');

var shell = require('shelljs')
shell.config.silent = true // stfu

var inquirer = require('inquirer')
var wordwrap = require('wordwrap')

var shop = adventure('npm-tutor');
var pkg = require('../package.json')

// reset completed chapters as we calculate this dynamically
shop.state.completed = []

// override select to show chapter's menu
shop.select = function(name) {
  var adv = this.find(name);
  this.state.current = name;
  this.save('current');
  var chapter = adv.fn();
  var menu = chapter.showMenu(chapter.options)
  menu.on('select', function(name) {
    setup(chapter, name)
  })
  // exit returns to current menu
  menu.on('exit', function() {
    shop.current = null
    shop.showMenu(shop.options)
  })
}

// override execute to forward commands to chapter
var execute = shop.execute.bind(shop)
shop.execute = function(args) {
  var cmd = args[0];

  var adv = this.find(this.state.current);
  if (!adv) {
    // if no chapter current shop got this
    return execute(args)
  }
  var chapter = adv.fn();

  if (!cmd || cmd === 'menu') {
    var menu = chapter.showMenu(chapter.options);
    menu.on('select', function(name) {
      setup(chapter, name)
    })
    // exit returns to current menu
    menu.on('exit', function() {
      shop.current = null
      shop.showMenu(shop.options)
    })
    return
  }

  // new command to reset all chapters
  if (cmd === 'reset-all') {
    chapters.forEach(function(chapterData) {
      var adv = shop.find(chapterData.name);
      adv.fn().execute(['reset'])
    })
    reset(shop)
    execute(['reset'])
    return
  }

  chapter.execute(args)
}

// gather all chapters as modules
var chapters = pkg.exercises.map(function(chapter) {
  var dir = path.resolve(__dirname, '..', chapter)
  return require(dir)
})

// add to shop
chapters.forEach(function(chapter) {
  shop.add(chapter.name, function() {
    return chapter
  })
})

// pass all completed chapters
chapters.forEach(function(chapter) {
  if (chapter.state.completed.length == chapter._adventures.length) {
    pass(shop, chapter.name)
  }
})

shop.execute(process.argv.slice(2));

// pass a chapter
function pass(shop, name) {
  // stub of shop.pass implementation
  // without fancy console output
  var ix = shop.state.completed.indexOf(name);
  if (ix < 0) shop.state.completed.push(name);
  shop.save('completed');
}

function setup(shop, name) {
  var adv = shop.find(name);
  if (!adv) return
  var chapter = adv.fn();
  var bootstrapFiles = path.resolve(chapter.pkgDir, 'bootstrap')
  if (!fs.existsSync(bootstrapFiles)) return
  var alreadyBootStrapped = fs.readdirSync(bootstrapFiles).every(function(file) {
    return fs.existsSync(path.resolve(process.cwd(), file))
  })
  if (alreadyBootStrapped) return
  console.log()
  inquirer.prompt([{
    'type': 'confirm',
    'name': 'ok',
    'default': true,
    'message': wordwrap(4, 80)(
      "We're about to populate *this directory* with some files/dirs "+
      "needed for these exercises. If they've already been created " +
      "then don't worry, they won't be replaced.\n\nContinue?"
    ).replace(/^\s+/, '')
  }], function(result) {
    if (!result.ok) return
    shell.cp('-R', bootstrapFiles + '/*', process.cwd())
  })
}
