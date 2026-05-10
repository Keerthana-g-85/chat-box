import { useEffect, useState } from 'react'
import MessageBubble from '../components/MessageBubble'
import MessageInput from '../components/MessageInput'
import JoinSection from '../components/JoinSection'
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

      <JoinSection username={username} setUsername={setUsername} joined={joined} setJoined={setJoined} />

      <div className="messages-container">
        {messages.map((msg, index) => (<MessageBubble msg={msg} key={index} username={username} />))}
      </div>

      <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage}/>

    </div>
  </div>
  )
}