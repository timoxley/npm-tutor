"use strict"

var path = require('path')
var mkdirp = require('mkdirp')
var cpr = require('cpr')
var dir = path.resolve(process.env['WORKSHOP_WORKING_DIR'])

cpr(path.resolve(__dirname, 'bootstrap'), dir, {
    overwrite: true, //If the file exists, overwrite it
}, function(err, files) {
  if (err) throw err
  //console.info('bootstrap created files:\n', files.map(function(f) {
    //return path.relative(process.env['WORKSHOP_WORKING_DIR'], f).trim()
  //}).join('\n'))
})
