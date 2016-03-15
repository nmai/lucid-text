
var text = document.getElementById('text1')
var socket = io('http://localhost:80')

// socket.emit('my other event', { my: 'data' })

socket.on('change', function (data) {
  console.log('Handling change event')
})


// Set up listeners
text.addEventListener('change', handleInput)
text.addEventListener('keypress', handleInput)
text.addEventListener('keydown', handleInput)
text.addEventListener('keyup', handleInput)
text.addEventListener('input', handleInput)
text.addEventListener('paste', handleInput)

function handleInput (event) {
  // console.log(event)
  switch(event.type) {
    case 'input':
      // console.log(event)
      break
    case 'keyup':
      // console.log(String.fromCharCode(event.keyCode))
      break
    case 'keypress':
      console.log(String.fromCharCode(event.keyCode))
      break
    case 'keydown':
      console.log(event)
      break
    case 'paste':
      break
    default:
      // console.log(event)
      break
  }
}
