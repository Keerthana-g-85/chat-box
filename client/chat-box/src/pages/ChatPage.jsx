import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

export default function ChatPage() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  const [joined, setJoined] = useState(false)

  useEffect(() => {

  socket.on('receive_message', (data) => {
    setMessages((prev) => [...prev, data])
  })

  return () => {
    socket.off('receive_message')
  }

}, [])

  function sendMessage(){
    if (!joined) return
    if (message.trim() === '') return

    const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
    } )

    const messageData = {
    user: username,
    text: message,
    time: currentTime
    }

  socket.emit('send_message', messageData)

  setMessage('')
  }

  return (
    <div>
      <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <button onClick={() => setJoined(true)}>Join</button>

      <div style={{ border:'1px solid black', height:'300px', overflowY:'scroll', padding:'10px', marginTop:'20px' }}>
      {messages.map((msg, index) => (
        <div key={index} style={{ marginBottom:'10px' }}>
        <p>{msg.user}: {msg.text}</p>
        <small>{msg.time}</small>
        </div>
          ))}
      </div>

      <input type="text" placeholder="Type message..."value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}