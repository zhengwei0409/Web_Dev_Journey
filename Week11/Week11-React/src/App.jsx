import {useState} from 'react'
import './App.css'

// custom hook
function useCounter() {
  const [count, setCount] = useState(0);

  function increateCount() {
    setCount(c => c+1);
  }

  return {
    count,
    increateCount
  }
}

function App() {

  

  return (
    <>
     <div>
      <Counter />
      <Counter />
      <Counter />
      <Counter />
      <Counter />
     </div>
    </>
  )
}

function Counter() {

  const {count, increateCount} = useCounter();

  return ( 
  <>
    <div>
      <button onClick={increateCount}>Increase {count}</button>
    </div>
  </>
  )
}

export default App
