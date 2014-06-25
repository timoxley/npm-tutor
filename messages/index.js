"use strict"

var fs = require('fs')
var path = require('path')
var resolve = require('path').resolve
var msee = require('msee')
var once = require('once')
var LANG = process.env.LANG || 'en'
var dir = resolve(__dirname, LANG)
if (!fs.existsSync(dir)) LANG = 'en'
dir = resolve(__dirname, LANG)

module.exports = fs.readdirSync(dir).reduce(function(messages, fileName) {
  var name = path.basename(fileName, path.extname(fileName))
  var file = resolve(dir, fileName)
  messages[name] = msee.parseFile(file, {
    paragraphStart: '',
    paragraphEnd: '\n'
  }).trim() + '\n'
  return messages
}, {})
