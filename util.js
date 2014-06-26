"use strict"

exports.detectPath = detectPath
exports.detectShell = detectShell

function detectShell() {
  return process.platform === 'win32'
    ? process.env.ComSpec || 'cmd'
    : process.env.SHELL || 'bash'
}

function detectPath() {
  var PATH = 'PATH'
  // windows calls it's path "Path" usually, but this is not guaranteed.
  if (process.platform === "win32") {
    PATH = "Path"
    Object.keys(process.env).forEach(function (e) {
      if (e.match(/^PATH$/i)) {
        PATH = e
      }
    })
  }
  return PATH
}

