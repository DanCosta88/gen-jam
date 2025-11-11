import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CharacterCard from '../components/CharacterCard'
import { useGame, CHARACTERS } from '../store/useGame'

function CharacterSelection() {
  const navigate = useNavigate()
  const { selectCharacter } = useGame()

  const handleSelectCharacter = (character) => {
    // Select character in store
    selectCharacter(character)

    // Animate and navigate to game
    setTimeout(() => {
      navigate('/world')
    }, 600) // Give time for animation
  }

  return (
    <div className="character-selection-container">
      <motion.div
        className="character-selection-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.h1
          className="selection-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choose Your Character
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="selection-subtitle"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Select your hero and start the adventure!
        </motion.p>

        {/* Character Cards Grid */}
        <motion.div
          className="character-cards-grid"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {CHARACTERS.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <CharacterCard
                character={character}
                onSelect={handleSelectCharacter}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CharacterSelection

