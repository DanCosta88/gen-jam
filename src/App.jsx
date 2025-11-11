import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CharacterSelection from './pages/CharacterSelection'
import World from './pages/World'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/choose-character" replace />} />
        <Route path="/choose-character" element={<CharacterSelection />} />
        <Route path="/world" element={<World />} />
      </Routes>
    </Router>
  )
}

export default App

