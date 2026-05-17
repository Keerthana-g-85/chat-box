import { useRef } from 'react'

export default function MessageInput({ message, setMessage, sendMessage, socket, room, username }) {
  const inputRef = useRef(null)
  const typingTimeout = useRef(null)

  return (
    <div className="input-section">

      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)

          socket.emit('typing', room, username)

          clearTimeout(typingTimeout.current)

          typingTimeout.current = setTimeout(() => {
            socket.emit('stop_typing', room)
          }, 1500)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage()
            socket.emit('stop_typing', room)
          }
        }}
        ref={inputRef}
        className="message-input"
      />

      <button
        onClick={() => {
          sendMessage()
          socket.emit('stop_typing', room)
          inputRef.current.focus()
        }}
        className="send-button"
      >
        Send
      </button>

    </div>
  )
}