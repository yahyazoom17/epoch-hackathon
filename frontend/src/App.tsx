import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ChatbotPage from './pages/ChatbotPage'
import WomenHealthPage from './pages/WomenHealthPage'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chatbot" replace />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/women-health" element={<WomenHealthPage />} />
        {/* Fallbacks for other uncreated pages */}
        <Route path="*" element={<ChatbotPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
