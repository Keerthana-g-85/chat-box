export default function JoinSection({username,setUsername,joined,joinRoom,room,setRoom}) {
  return (

    <div className="join-section">

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="username-input"
      />

      <input 
      type="text" 
      placeholder="Enter room name" 
      value={room} 
      onChange={(e) => setRoom(e.target.value)} 
      className="username-input" />

      <button onClick={joinRoom} disabled={joined} className="join-button">Join</button>

    </div>

  )
}