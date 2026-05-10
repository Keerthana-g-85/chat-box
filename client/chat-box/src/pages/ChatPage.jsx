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
    
  }

  return (
    <div>
      <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <button onClick={() => setJoined(true)}>Join</button>

      <input type="text" placeholder="Type message..."value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}