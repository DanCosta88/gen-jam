import React from 'react'
import { motion } from 'framer-motion'

function PauseMenu({ onResume, onBackToMenu, onQuit }) {
  return (
    <motion.div
      className="pause-menu-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="pause-menu-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
      >
        <h1 className="pause-menu-title">PAUSE MENU</h1>
        
        <div className="pause-status">Paused</div>
        
        <div className="pause-menu-buttons">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#555' }}
            whileTap={{ scale: 0.95 }}
            onClick={onResume}
            className="pause-button"
          >
            Restart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#555' }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackToMenu}
            className="pause-button"
          >
            Main Menu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#555' }}
            whileTap={{ scale: 0.95 }}
            onClick={onQuit}
            className="pause-button"
          >
            Quit Game
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PauseMenu

