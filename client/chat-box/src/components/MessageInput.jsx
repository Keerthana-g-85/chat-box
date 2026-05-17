import { useRef } from 'react'

export default function MessageInput({ message, setMessage, sendMessage }) {
    const inputRef = useRef(null)
  return (

    <div className="input-section">

      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                sendMessage()
                }
            }}
        ref={inputRef}
        className="message-input"
      />

      <button
        onClick={()=>{ sendMessage()
        inputRef.current.focus()
        }}
        className="send-button">Send
      </button>

    </div>

  )
}