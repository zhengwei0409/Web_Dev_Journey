import { useState } from "react"

function App() {
  return <div>

    <Counter></Counter>
  </div>
  
}

function Counter() {

  const [num, setNum] = useState(0);

  // useEffect(function() {
  //     setInterval(function(){
  //       setNum(num => num + 1);
  //     },1000)
  // },[])

  function increaseCount() {
    setNum(num + 1);
  }

  function decreaseCount() {
    setNum(num-1);
  }

  return <div>
    <h1>{num}</h1>
    <button onClick={increaseCount}>increase amount</button>
    <button onClick={decreaseCount}>increase amount</button>
  </div>
}

export default App
