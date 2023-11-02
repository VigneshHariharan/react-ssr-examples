import { useState } from 'react'
import { Card } from './components/Card.jsx'
// import { note } from './App.module.css'
// import './App.css'
// import './index.css';
      {
        /* <div className={note}>Note component</div> */
      }


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Vite + React client rendered</h1>
      <div className="card">
        <p>App file rendered in this </p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Card></Card>
    </div>
  );
}

export default App
