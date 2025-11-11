import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Game from '../components/Game'
import PauseMenu from '../components/PauseMenu'
import VisualNovelDialog from '../components/VisualNovelDialog'
import { useGame } from '../store/useGame'
import { useKeyboard } from '../hooks/useKeyboard'

function World() {
  const navigate = useNavigate()
  const keys = useKeyboard()
  const prevEscapeRef = useRef(false)
  const { score, health, maxHealth, gameOver, resetGame, selectedCharacter, isPaused, togglePause, setPause, isDialogOpen, currentDialog, closeDialog, bossHealth, bossMaxHealth, bossDefeated } = useGame()

  // Redirect to character selection if no character selected
  useEffect(() => {
    if (!selectedCharacter) {
      navigate('/choose-character')
    }
  }, [selectedCharacter, navigate])

  // Handle ESC key for pause menu (toggle on key press)
  useEffect(() => {
    if (keys.escape && !prevEscapeRef.current && !gameOver && !isDialogOpen) {
      togglePause()
    }
    prevEscapeRef.current = keys.escape
  }, [keys.escape, gameOver, isDialogOpen, togglePause])

  const handleResetGame = () => {
    resetGame()
  }

  const handleBackToMenu = () => {
    resetGame()
    navigate('/choose-character')
  }

  const handleResume = () => {
    setPause(false)
  }

  const handleQuit = () => {
    // Quit could close the window or go back to menu
    handleBackToMenu()
  }

  if (!selectedCharacter) {
    return null
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* HUD con barra della vita in alto a sinistra */}
      <div className="game-hud">
        <div className="character-info">
          <span className="character-avatar">{selectedCharacter.emoji}</span>
          <span className="character-name-small">{selectedCharacter.name}</span>
        </div>
        <div className="health-container">
          <div className="health-label">HEALTH</div>
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

      {/* Boss Health (top right) */}
      {!bossDefeated && (
        <div className="boss-hud">
          <div className="boss-label">💼 INVESTOR</div>
          <div className="boss-health">
            {[...Array(bossMaxHealth)].map((_, i) => (
              <span 
                key={i} 
                className={`boss-heart ${i < bossHealth ? 'active' : 'inactive'}`}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="game-controls">
        <div>Controls: A/D to move | W/SPACE to jump | F to shoot</div>
      </div>

      {/* Visual Novel Dialog */}
      <VisualNovelDialog
        isOpen={isDialogOpen}
        characterName={currentDialog?.characterName}
        dialogText={currentDialog?.dialogText}
        characterImage={currentDialog?.characterImage}
        onClose={closeDialog}
      />

      {isPaused && !gameOver && !isDialogOpen && (
        <PauseMenu
          onResume={handleResume}
          onBackToMenu={handleBackToMenu}
          onQuit={handleQuit}
        />
      )}

      {bossDefeated && (
        <div className="game-over victory">
          <h1>🏆 Victory! 🏆</h1>
          <p>You convinced the investor!</p>
          <p>Character: {selectedCharacter.name}</p>
          <p>Final Score: {score}</p>
          <div className="game-over-buttons">
            <button onClick={handleResetGame}>Play Again</button>
            <button onClick={handleBackToMenu} className="secondary-button">
              Change Character
            </button>
          </div>
        </div>
      )}

      {gameOver && !bossDefeated && (
        <div className="game-over">
          <h1>Game Over!</h1>
          <p>Character: {selectedCharacter.name}</p>
          <p>Final Score: {score}</p>
          <div className="game-over-buttons">
            <button onClick={handleResetGame}>Play Again</button>
            <button onClick={handleBackToMenu} className="secondary-button">
              Change Character
            </button>
          </div>
        </div>
      )}

      <Game />
    </div>
  )
}

export default World

