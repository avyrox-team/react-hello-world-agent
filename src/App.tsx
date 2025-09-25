import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-container">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <h1>Hello World!</h1>
        <p className="subtitle">React 18 + TypeScript + Vite</p>
      </header>
      
      <main className="app-main">
        <div className="counter-card">
          <h2>Interactive Counter</h2>
          <button 
            className="counter-button" 
            onClick={() => setCount((count) => count + 1)}
          >
            Count: {count}
          </button>
          <p className="counter-description">
            Click the button above to increment the counter
          </p>
        </div>
        
        <div className="welcome-card">
          <h2>Welcome to React TypeScript</h2>
          <p>
            This is a modern React application built with:
          </p>
          <ul className="tech-list">
            <li>⚡ Vite for fast development</li>
            <li>⚛️ React 18 with hooks</li>
            <li>📘 TypeScript for type safety</li>
            <li>🎨 Modern CSS with dark theme</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
