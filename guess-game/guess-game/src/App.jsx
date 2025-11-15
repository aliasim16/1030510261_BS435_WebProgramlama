import './App.css'
import { Counter } from './counter';
import { useState } from 'react'


function App() {

  const [count,setCount]=useState(5);

  return (
    <>
    <h1>{Count}</h1>
    <Counter count1={count} setCount1={setCount}/>
    <Counter count1={count} setCount1={setCount}/>
    <Counter count1={count} setCount1={setCount}/>
    <Counter count1={count} setCount1={setCount}/>
    <Counter count1={count} setCount1={setCount}/>
    <Counter count1={count} setCount1={setCount}/>
      
    </>
  )
}

export default App
