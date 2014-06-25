"use strict"

var test = require('tape')
var rimraf = require('rimraf')

var Data = require('../lib/data')
var tmpDir = require('quick-tmp')('test-data')

var data = undefined

function setup() {
  data = Data('test-data', tmpDir())
}

function teardown() {
  rimraf.sync(data.dir)
}

test('get all data empty = {}', function(t) {
  setup()
  var value = data.get()
  t.deepEqual(value, {})
  t.end()
  teardown()
})

test('set return value == data', function(t) {
  setup()
  var value = {saved: true}
  t.deepEqual(data.set('value', value), value)
  t.end()
  teardown()
})

test('set + get all data', function(t) {
  setup()
  var expected = {
    value: {saved: true}
  }
  data.set('value', expected.value)
  t.deepEqual(data.get(), expected)
  t.end()
  teardown()
})

test('get data by key', function(t) {
  setup()
  var expected = {saved: true}
  data.set('value', expected)
  t.deepEqual(data.get('value'), expected)
  t.end()
  teardown()
})

test('get undefined data', function(t) {
  setup()
  t.deepEqual(data.get('value'), undefined)
  t.end()
  teardown()
})

test('get data set default', function(t) {
  setup()
  var expected = {saved: true}
  t.deepEqual(data.get('value'), undefined, 'value undefined by default')
  t.deepEqual(data.get('value', expected), expected, 'will return default')
  t.deepEqual(data.get('value'), expected, 'should have set value')
  t.deepEqual(data.get('value', {doNotUse: true}), expected, 'should not use default if already set')
  t.end()
  teardown()
})

test('set data by key function', function(t) {
  setup()
  var input = {saved: 1}
  data.set('value', input)
  data.set('value', function(old) {
    old.saved++
    return old
  })
  var actual = data.get('value')
  t.deepEqual(actual, {
    saved: 2
  })
  t.end()
  teardown()
})

test('clear data', function(t) {
  setup()
  var input = {saved: true}
  data.set('value', input)
  t.ok(data.get('value'))
  data.clear()
  t.deepEqual(data.get(), {})
  t.deepEqual(data.get('value'), undefined)
  t.end()
  teardown()
})
