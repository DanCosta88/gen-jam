import React from 'react'
import { motion } from 'framer-motion'

function CharacterCard({ character, onSelect }) {
  return (
    <motion.div
      className="character-card"
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => onSelect(character)}
    >
      <motion.div 
        className="character-card-inner"
        style={{ backgroundColor: character.color }}
      >
        {/* Character Image/Emoji */}
        <div className="character-image">
          <span className="character-emoji">{character.emoji}</span>
        </div>

        {/* Character Name */}
        <div className="character-name">
          <h3>{character.name}</h3>
        </div>

        {/* Hover effect overlay */}
        <motion.div 
          className="character-card-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <span>Select</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default CharacterCard

