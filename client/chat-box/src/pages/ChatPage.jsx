import { useEffect, useState , useRef } from 'react'
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
  const [room, setRoom] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {

  socket.on('receive_message', (data) => {
    setMessages((prev) => [...prev, data])
  })

  return () => {
    socket.off('receive_message')
  }
}, [])

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior:'smooth'
  })
  }, [messages])

  function joinRoom() {
  if (username.trim() === '' || room.trim() === '') return
  socket.emit('join_room', room)
  setJoined(true)
}

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
    time: currentTime,
    room:room
    }

  socket.emit('send_message', messageData)

  setMessage('')
  }

  return (
  <div className="chat-page">

    <div className="chat-container">

      <JoinSection username={username} setUsername={setUsername} joined={joined} joinRoom={joinRoom} room={room} setRoom={setRoom}/>

      <div className="messages-container">
        {messages.map((msg, index) => (<MessageBubble msg={msg} key={index} username={username} />))}
        <div ref={messagesEndRef}></div>
      </div>

      <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage}/>

    </div>
  </div>
  )
}