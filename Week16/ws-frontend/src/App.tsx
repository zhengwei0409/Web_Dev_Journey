
import { useEffect, useRef, useState } from 'react'
import './App.css'

// more elegent useSocket hooks
function App() {

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function sendMessage() {
    if(!socket) return;
    const message = inputRef.current?.value;
    if(message) {
      socket.send(message);
    }
    
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (ev) => {
      alert(ev.data);
    }

    ws.onerror = () => {

    }
    
    ws.onclose = () => {

    }

    ws.onopen = () => {

    }

  }, [])

  return (
    <div>
      <input ref={inputRef} type="text" placeholder='Message...' />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
