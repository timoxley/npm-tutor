"use strict"

var http = require('http')

var URL = 'http://nodejs.org/dist/latest/SHASUMS.txt'

module.exports = function(fn) {
  http.get(URL, function (res) {
    var body = ''
    res.on('data', function (chunk) {
      body += chunk
    }).on('error', function(err) {
      return fn(err)
    }).on('end', function () {
      var latest = /node-v(\d+\.\d+\.\d+)/.exec(body)
      latest = latest && latest[1]
      if (!latest) return fn(new Error('Could not get latest version!'))
      return fn(null, latest)
    })
  })
}

