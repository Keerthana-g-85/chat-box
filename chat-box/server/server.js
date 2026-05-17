const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const chatHistory = {}

io.on('connection', (socket) => {
  console.log('User connected')
  console.log(socket.id)

  socket.on('join_room', (room) => {
  socket.join(room)

  if (chatHistory[room]) {
    socket.emit('chat_history', chatHistory[room])
  } else {
    chatHistory[room] = []
  }

  console.log(`Joined room: ${room}`)
})

  socket.on('send_message', (data) => {
  chatHistory[data.room].push(data)
  io.to(data.room).emit('receive_message', data)
})

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

server.listen(3001, () => {
  console.log('Server running on port 3001')
})