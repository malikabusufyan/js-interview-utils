// interface Todo { id: number; text: string; done: boolean; }

//Try it without the key prop first — it renders fine, but check the console: a yellow warning, 
// "Each child in a list should have a unique 'key' prop." This isn't cosmetic. 
// key is how React tracks which list item is which across re-renders — without it, React falls back to guessing by position, 
// and if the list reorders (sort, delete, insert), it can update the wrong DOM node with the wrong data. Add key={todo.id} back, warning gone.

// function TodoList({ todos }: { todos: Todo[] }) {
//   return (
//     <ul>
//       {todos.map((todo) => (
//         <li key={todo.id}>{todo.text}</li>
//       ))}
//     </ul>
//   );
// }
// import { useState } from 'react';

// interface Todo { id: number; text: string; done: boolean; }

// function TodoApp() {
//   const [todos, setTodos] = useState<Todo[]>([
//     { id: 1, text: "Learn TypeScript", done: false },
//     { id: 2, text: "Build a Todo app", done: false },
//     { id: 3, text: "Ship it", done: false },
//   ]);

//   const remove = (id: number) => setTodos(todos.filter((t) => t.id !== id));

//   return (
//     <ul>
//       {todos.map((todo) => (
//         <li key={todo.id}>
//           <input type="checkbox" />   {/* uncontrolled — holds its own state */}
//           {todo.text}
//           <button onClick={() => remove(todo.id)}>x</button>
//         </li>
//       ))}
//     </ul>
//   );
// }

import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
// console.log("effect ran")
  useEffect(() => {
const id = setInterval(() => {
  console.log("tick");
  setSeconds((s) => s + 1);
}, 1000);
     return () => clearInterval(id);   // cleanup — runs before the NEXT effect, and on unmount
  //   const id = setInterval(() => setSeconds(seconds + 1), 1000);   // direct form, NOT functional
  // return () => clearInterval(id);
  }, []);                              // dependency array — empty = run once, on mount

  return <p>Seconds: {seconds}</p>;
}
function App() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle Timer</button>
      {show && <Timer />}
    </div>
  );
}
// function App() {
//   return <Timer />;
// }
 // import { useState } from 'react'
// import './App.css'

 // import Greeting from './Greeting';
// import TodoList from './Todo';


// function App() {
//   // const [count, setCount] = useState<number>(0);
//   // const [text, setText] = useState<string>('')

//   return (
//     <div>
//       <button onClick={TodoList}>Show Todos</button>
//       {/* <div> */}
//         {/* <p>Count: {count}</p>
//         <button onClick={() => setCount(count + 1)}>+1</button>
//         <button onClick={() => setCount(count - 1)}>-1</button>
//         <p>Text User:</p>
//         <input value={text} onChange={(e) => setText(e.target.value)} />
//         <p>You typed: {text}</p>
//         <button onClick={() => { setCount(0); setText('') }}>Reset</button>
//       <div>
//         <p>Greetings:</p>
//         <Greeting name="Sufyan" />
//         <Greeting name="Alex" age={25} />
//         <Greeting name="Sam" age={0} />
//       </div>
//       </div>      */}
//     </div>
//   )
  
// }

 export default App;
