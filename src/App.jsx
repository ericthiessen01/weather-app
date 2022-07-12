import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'

function App() {
  const key = import.meta.env.VITE_API_KEY
  console.log(key)

  return (
    <div className="App">
      <header className="App-header">
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes> */}
        <p>Hello Vite + React!</p>
        <p>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
