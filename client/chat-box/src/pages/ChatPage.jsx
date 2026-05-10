import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

export default function ChatPage() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <div>
      Chat Page
    </div>
  )
}