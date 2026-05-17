export default function MessageBubble({ msg, username }) {
  return (
    <div className={msg.user === username ? 'message-row my-row' : 'message-row other-row'}>

      {/* Show avatar on left for other user's messages */}
      {!(msg.user === username) && (
        <div className="avatar">
          {msg.user.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Chat bubble with different styling for my messages and other messages */}
      <div className={msg.user === username ? 'message-bubble my-message' : 'message-bubble other-message'}>
        <div className="message-content">
          <span className="message-text">{msg.text}</span>
          <span className="message-time">{msg.time}</span>
        </div>
      </div>

      {/* Show avatar on right for my own messages */}
      {msg.user === username && (
        <div className="avatar">
          {msg.user.charAt(0).toUpperCase()}
        </div>
      )}

    </div>
  )
}