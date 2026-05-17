export default function MessageBubble({ msg, username }) {
  return (

    <div className={msg.user === username ? 'message-row my-row' : 'message-row other-row'}>

      <div className={msg.user === username ? 'message-bubble my-message' : 'message-bubble other-message'}>

        <p className="message-user">{msg.user}</p>

        <i className="message-text">{msg.text}</i>

        <small className="message-time">{msg.time}</small>

      </div>

    </div>

  )
}