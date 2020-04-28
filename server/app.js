const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
let id = 0
io.on('connection', (socket) => {
  console.log('IO Connected')

  socket.on('createTag', (data) => {
    io.emit('newTag',
      {
        name: data.name,
        color: data.color,
        id: id++
      }
    )
  })

  socket.on('deleted', (id) => {
    io.emit('deletTag', id)
  })

  socket.on('updated', (data) => {
    console.log('server update')
    io.emit('updateTag', data)
  })
})

module.exports = {
  app,
  server
}
