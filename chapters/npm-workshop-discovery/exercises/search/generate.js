"use strict"

var fs = require('fs')
var spawn = require('child_process').spawn
var split = require('split2')

spawn('npm', ['search', 'csv', 'json', '--no-color'])
.stdout.pipe(split())
.on('data', function(line) {
  if (lineNo++ == 0) return
  var name = line.split(' ')[0]
  name = name.trim()
  names.push(name)
})
.on('end', function() {
  fs.writeFile(__dirname + '/csvtojson.json', JSON.stringify(names))
  console.log('wrote ' + names.length + ' to ' + __dirname + '/csvtojson.json')
})
