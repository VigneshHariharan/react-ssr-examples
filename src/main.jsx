// import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ReactDOM.hydrateRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

console.log('main js root hydrate')

ReactDOM.hydrateRoot(document.getElementById('root'), <App />)