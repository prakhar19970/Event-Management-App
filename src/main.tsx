import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <div className="min-h-screen bg-gradient-to-r from-black via-purple-500 to-black">
      <App />
    </div>
  </StrictMode>,
)
