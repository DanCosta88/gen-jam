import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function VisualNovelDialog({ isOpen, characterName, dialogText, characterImage, onClose }) {
  if (!isOpen) return null

  const handleClick = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="visual-novel-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClick}
        >
          {/* Character Image */}
          <motion.div
            className="vn-character-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="vn-character-frame">
              {characterImage ? (
                <img src={characterImage} alt={characterName} className="vn-character-image" />
              ) : (
                <div className="vn-character-placeholder">
                  <div className="vn-character-emoji">
                    {characterName === "Aura" && "✨"}
                    {characterName === "Danilo" && "⚡"}
                    {characterName === "Andre" && "🌿"}
                    {characterName === "Arun" && "🔥"}
                    {characterName === "Yashodh" && "🌟"}
                    {!["Aura", "Danilo", "Andre", "Arun", "Yashodh"].includes(characterName) && "👤"}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Dialog Box */}
          <motion.div
            className="vn-dialog-container"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="vn-dialog-box">
              {/* Character Name Box */}
              <div className="vn-name-box">
                <div className="vn-name-text">{characterName}</div>
              </div>

              {/* Dialog Text */}
              <div className="vn-dialog-text">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {dialogText}
                </motion.p>
              </div>

              {/* Continue Indicator */}
              <motion.div
                className="vn-continue-indicator"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <div className="vn-hexagon">▶</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Click anywhere hint */}
          <motion.div
            className="vn-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1 }}
          >
            Click anywhere to continue
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default VisualNovelDialog

