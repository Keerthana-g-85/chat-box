export default function MessageInput({ message, setMessage, sendMessage }) {
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
        className="message-input"
      />

      <button
        onClick={sendMessage}
        className="send-button">Send
      </button>

    </div>

  )
}