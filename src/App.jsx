import { Suspense } from 'react'
import { Card } from './components/Card.jsx'
import { Comments } from './components/Comments.jsx';
import { Count } from './components/Count.jsx'

function App() {

  return (
    <div>
      <h1>Vite + React client rendered</h1>
      <div className="card">
        <Count text="App file state" ></Count>
      </div>
      <Suspense
        fallback={
          <div>
            <p>Loading comments....</p>
          </div>
        }
      >
        <Comments></Comments>
      </Suspense>
      <Card></Card>
    </div>
  );
}

export default App
