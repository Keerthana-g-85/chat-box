import { useRef } from 'react'

export default function MessageInput({ message, setMessage, sendMessage, socket, room, username }) {
  // Reference to focus input after sending message
  const inputRef = useRef(null)

  // Used to control typing indicator timeout
  const typingTimeout = useRef(null)

  return (
    <div className="input-section">

      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)

          // Notify other user that typing has started
          socket.emit('typing', room, username)

          // Reset timer whenever user keeps typing
          clearTimeout(typingTimeout.current)

          // Stop typing indicator after user pauses
          typingTimeout.current = setTimeout(() => {
            socket.emit('stop_typing', room)
          }, 1500)
        }}
        onKeyDown={(e) => {
          // Send message when Enter is pressed
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

          // Keep cursor in input after sending
          inputRef.current.focus()
        }}
        className="send-button"
      >
        Send
      </button>

    </div>
  )
}