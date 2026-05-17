export default function MessageBubble({ msg, username }) {
  
  return (

    <div className={msg.user === username ? 'message-row my-row' : 'message-row other-row'}>

      {!(msg.user === username)&& (
        <div className="avatar">
          {msg.user.charAt(0).toUpperCase()}
        </div>
      )}

      <div className={msg.user === username ? 'message-bubble my-message' : 'message-bubble other-message'}>
        <div className="message-content">
          <span className="message-text">{msg.text}</span>
          <span className="message-time">{msg.time}</span>
        </div>
      </div>

      {msg.user === username && (
        <div className="avatar">
          {msg.user.charAt(0).toUpperCase()}
        </div>
      )}

    </div>

  )
}