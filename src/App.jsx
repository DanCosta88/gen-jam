import React from 'react'
import Game from './components/Game'
import { useGame } from './store/useGame'

function App() {
  const { score, lives, gameOver, resetGame } = useGame()

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div className="game-ui">
        <div>Score: {score}</div>
        <div>Lives: {lives}</div>
      </div>

      <div className="game-controls">
        <div>Controlli: ← → per muoversi | SPAZIO per saltare</div>
      </div>

      {gameOver && (
        <div className="game-over">
          <h1>Game Over!</h1>
          <p>Score finale: {score}</p>
          <button onClick={resetGame}>Rigioca</button>
        </div>
      )}

      <Game />
    </div>
  )
}

export default App

