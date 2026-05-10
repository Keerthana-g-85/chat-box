import { useEffect, useState } from 'react'
import MessageBubble from '../components/MessageBubble'
import io from 'socket.io-client'
import '../styles/ChatPage.css'

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
  <div className="chat-page">

    <div className="chat-container">

      <div className="join-section">
        <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} className="username-input" />
        <button onClick={() => setJoined(true)} disabled={joined} className="join-button">Join</button>
      </div>

      <div className="messages-container">

  {messages.map((msg, index) => (<MessageBubble msg={msg} key={index} username={username} />))}</div>
      

      <div className="input-section">
        <input type="text" placeholder="Type message..." value={message} onChange={(e) => setMessage(e.target.value)} className="message-input" />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  </div>
  )
}