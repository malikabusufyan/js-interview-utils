import { useState } from 'react'
import './App.css'

import Greeting from './Greeting';


function App() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('')

  return (
    <div>
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <p>Text User:</p>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <p>You typed: {text}</p>
        <button onClick={() => { setCount(0); setText('') }}>Reset</button>
      <div>
        <p>Greetings:</p>
        <Greeting name="Sufyan" />
        <Greeting name="Alex" age={25} />
        <Greeting name="Sam" age={0} />
      </div>
      </div>     
    </div>
  )
  
}

export default App;
