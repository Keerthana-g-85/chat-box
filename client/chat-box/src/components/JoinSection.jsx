export default function JoinSection({username,setUsername,joined,setJoined}) {
  return (

    <div className="join-section">

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="username-input"
      />

      <button
        onClick={() => setJoined(true)}
        disabled={joined}
        className="join-button"
      >
        Join
      </button>

    </div>

  )
}