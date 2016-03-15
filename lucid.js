'use strict'

let ot = require('ot')
let OPStack = require ('./OPStack')
const EventEmitter = require('events')

function Lucid (opts) {
  opts = opts || {}

  this.value = opts.value || ''
  this.selectionStart = opts.selectionStart || 0
  this.selectionEnd = opts.selectionEnd || 0
  this.selectionDirection = opts.selectionDirection || 'forward'

  // note: this reflect the client's current revision. it should be ahead of the
  // server's latest revision if everything is fully up-to-date. a blank doc on
  // the server has a revision of -1, as its revision history will be empty.
  this.revision = opts.revision || 0

  this.pending = new OPStack()
  this.sent = new OPStack()

  this.pending.on('push', function(a) {
    console.log('push happened')
  })

  this.sent.on('push', function(a) {
    console.log('sending this biotch')
  })

  let asdf = new ot.TextOperation()
}

Lucid.prototype.change = function (str, start) { //, end, dir) {
  let current = this.pending.pop()
  let pre = start
  let post = current ? current.targetLength - start : this.value.length - start

  let latest = new ot.TextOperation()
    .retain(pre)
    .insert(str)
    .retain(post)

  let target = this.pending

  if (current) {
    if (post < 0 || current.targetLength - start < 0)
      this.pending.push(current)
    else
      latest = current.compose(latest)
  }

  this.pending.push(latest)
}

Lucid.prototype.apply = function () {
  var current = this.pending.pop()

  var str = current.apply(this.value)

  console.log(str)
}

Lucid.prototype.send = function (latest) {
  if (this.pending.length < 1)
    return false

  var sending = this.pending.shift()

  // stuff

  this.sent.push(sending)
}

Lucid.prototype.process = function (res) {
  switch (res.type) {
    case 'ack':
      this.revision++
      this.sent.shift()
      break

    case 'change':

      break

    case 'error':
      console.log('gosh darn it all to heck')
      break
  }
}

module.exports = Lucid
