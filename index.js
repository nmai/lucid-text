/**
 * This is where magic happens. Basically, after reviewing my notes, I believe
 * the whole thing can be implemented in 300 lines of code. In order to meet
 * this goal, I might re-use some code between the client and the server!
 */

/**
 * Client Requirements:
 *
 * - Store entire snapshot string for the current document
 * - "Chunk" changes
 * - Provide a small API for transport interface and client interface
 * - Need to wait for server acknowledgment before erasing pending changes
 */

'use strict'

let Lucid = require('./lucid')
let luc = new Lucid()
let express = require('express')
let app = express()
let http = require('http').Server(app)
let io = require('socket.io')(http)

app.use('/', express.static(__dirname))

http.listen(80)

io.on('connection', function (socket) {
  // socket.on('my other event', function (data) {
  //   console.log(data)
  // })
})
