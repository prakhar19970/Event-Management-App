import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="h-screen bg-gradient-to-r from-black via-purple-500 to-black">
      <App />
    </div>
  </StrictMode>,
)
