import { useEffect, useState, useRef } from 'react'
import MessageBubble from '../components/MessageBubble'
import MessageInput from '../components/MessageInput'
import JoinSection from '../components/JoinSection'
import io from 'socket.io-client'
import '../styles/ChatPage.css'

// Connect frontend to socket server
const socket = io('http://localhost:3001')

export default function ChatPage() {
  // Store current input message
  const [message, setMessage] = useState('')

  // Store all chat messages
  const [messages, setMessages] = useState([])

  // Store entered username
  const [username, setUsername] = useState('')

  // Check whether user joined a room
  const [joined, setJoined] = useState(false)

  // Store room name
  const [room, setRoom] = useState('')

  // Show typing indicator text
  const [typingUser, setTypingUser] = useState('')

  // Used for auto scrolling to latest message
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Receive new message instantly
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data])
    })

    // Load previous messages when joining room
    socket.on('chat_history', (history) => {
      setMessages(history)
    })

    // Alert if room already has 2 users
    socket.on('room_full', () => {
      alert('Room is full')
    })

    // Show typing indicator only for other user
    socket.on('show_typing', (typingUsername) => {
      if (typingUsername !== username) {
        setTypingUser(`${typingUsername} is typing...`)
      }
    })

    // Hide typing indicator
    socket.on('hide_typing', () => {
      setTypingUser('')
    })

    // Cleanup listeners
    return () => {
      socket.off('receive_message')
      socket.off('chat_history')
      socket.off('room_full')
      socket.off('show_typing')
      socket.off('hide_typing')
    }
  }, [])

  // Automatically scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  // Join selected room
  function joinRoom() {
    if (username.trim() === '' || room.trim() === '') return

    socket.emit('join_room', room)
    setJoined(true)
  }

  // Send message
  function sendMessage() {
    if (!joined) return
    if (message.trim() === '') return

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    const messageData = {
      user: username,
      text: message,
      time: currentTime,
      room: room,
    }

    socket.emit('send_message', messageData)

    // Clear input after sending
    setMessage('')
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        {/* Username + room join section */}
        <JoinSection
          username={username}
          setUsername={setUsername}
          joined={joined}
          joinRoom={joinRoom}
          room={room}
          setRoom={setRoom}
        />

        {/* Chat messages */}
        <div className="messages-container">
          {messages.map((msg, index) => (
            <MessageBubble msg={msg} key={index} username={username} />
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Typing indicator */}
        {typingUser && <p className="typing-text">{typingUser}</p>}

        {/* Message input box */}
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          socket={socket}
          room={room}
          username={username}
        />
      </div>
    </div>
  )
}