"use strict"

module.exports = function(exercises, data) {
  return {
    getCurrent: getCurrent,
    setCurrent: setCurrent,
    getNext: getNext,
    getPrev: getPrev,
    setNext: setNext,
    setPrev: setPrev
  }

  function setCurrent(exerciseName) {
    return exercises[data.set('current', exerciseName)]
  }

  function getCurrent() {
    return exercises[data.get('current', exercises[0].name)]
  }

  function getNext() {
    var current = getCurrent()
    var next = exercises[current.sequence + 1]
    return (next) ? next : current
  }

  function getPrev() {
    var current = getCurrent()
    var prev = exercises[current.sequence - 1]
    return (prev) ? prev : current
  }

  function setNext() {
    return setCurrent(getNext().name)
  }

  function setPrev() {
    return setCurrent(getPrev().name)
  }
}
