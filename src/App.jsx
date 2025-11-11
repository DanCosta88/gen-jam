import React from 'react'
import Game from './components/Game'
import { useGame } from './store/useGame'

function App() {
  const { score, health, maxHealth, gameOver, resetGame } = useGame()

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* HUD con barra della vita in alto a sinistra */}
      <div className="game-hud">
        <div className="health-container">
          <div className="health-label">VITA</div>
          <div className="health-bar-bg">
            <div 
              className="health-bar-fill" 
              style={{ 
                width: `${(health / maxHealth) * 100}%`,
                backgroundColor: health > 60 ? '#4CAF50' : health > 30 ? '#FFA500' : '#FF0000'
              }}
            />
          </div>
          <div className="health-text">{health}/{maxHealth}</div>
        </div>
        <div className="score">Score: {score}</div>
      </div>

      <div className="game-controls">
        <div>Controlli: A/D per muoversi | W/SPAZIO per saltare | F per sparare</div>
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

