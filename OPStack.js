/**
 * A most glorious wrapper of the native Array. With events.
 * Needs lots of tests.
 */

'use strict'

const EventEmitter = require('events')
const util = require('util')

function OPStack () {
  this.arr = []

  EventEmitter.call(this)
}

util.inherits(OPStack, EventEmitter)

OPStack.prototype.push = function (obj) {
  this.emit('push')
  return this.arr.push(obj)
}

OPStack.prototype.pop = function (obj) {
  this.emit('pop')
  return this.arr.pop(obj)
}

module.exports = OPStack
