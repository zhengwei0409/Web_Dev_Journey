
import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  const [message, setMessage] = useState<string[]>(["Welcome to fake chat!"]);

  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (e) => {
      setMessage(m => [...m,e.data]);
    }

    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type:"join",
        payload: {
          roomId: "red"
        }
      }))
    }

    return () => {
      ws.close()
    }

  },[])

  return (
    <div className='h-sceen bg-black'>
      <br /><br /><br />
      <div className='h-[85vh]'>
        {
          message.map((m,i) => {
            return (<div key={i} className='m-8'>
              <span className='bg-white text-black rounded p-4'>
                {m}
              </span>
            </div>)
          })
        }
      </div>
      <div className='w-full bg-white flex'>
        <input ref={inputRef} type="text" className='flex-1 p-4'/>
        <button onClick={() => {
          console.log(message)
          const message2 = inputRef.current?.value;
          

          wsRef.current?.send(JSON.stringify({
            type:"chat",
            payload: {
              message: message2
            }
          }))
        }}
        className='bg-purple-600 text-white p-4'

        >
        send message  
        </button>
      </div>
    </div>
  )
}

export default App
