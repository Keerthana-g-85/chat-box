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
const roomUsers = {}

io.on('connection', (socket) => {
  console.log('User connected')
  console.log(socket.id)

  socket.on('typing', (room, username) => {
  socket.to(room).emit('show_typing', username)
  })

  socket.on('stop_typing', (room) => {
  socket.to(room).emit('hide_typing')
  })

  socket.on('join_room', (room) => {

  if (!roomUsers[room]) {
    roomUsers[room] = []
  }

  if (roomUsers[room].includes(socket.id)) return

  if (roomUsers[room].length >= 2) {
    socket.emit('room_full')
    return
  }

  roomUsers[room].push(socket.id)

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
    for (const room in roomUsers) {
    roomUsers[room] = roomUsers[room].filter(id => id !== socket.id)

    if (roomUsers[room].length === 0) {
      delete roomUsers[room]
      delete chatHistory[room]
    }
  }
    console.log('User disconnected')
  })
})

server.listen(3001, () => {
  console.log('Server running on port 3001')
})