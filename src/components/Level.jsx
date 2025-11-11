import { useEffect } from 'react'
import Platform from './Platform'
import Background from './Background'
import Coin from './Coin'
import Checkpoint from './Checkpoint'
import { useGame } from '../store/useGame'

// Level data - platforms configuration for side-scrolling 2D (simplified and closer)
const levelData = [
  // Ground platforms - closer together
  { position: [0, 0, 0], size: [18, 0.5, 3], color: '#228B22' },
  { position: [20, 0, 0], size: [15, 0.5, 3], color: '#228B22' },
  { position: [37, 0, 0], size: [12, 0.5, 3], color: '#228B22' },
  { position: [51, 0, 0], size: [18, 0.5, 3], color: '#228B22' },
  
  // First level platforms - closer and easier jumps
  { position: [10, 2.5, 0], size: [5, 0.5, 2.5], color: '#8B4513' },
  { position: [16, 3.5, 0], size: [5, 0.5, 2.5], color: '#8B4513' },
  { position: [22, 4.5, 0], size: [5, 0.5, 2.5], color: '#8B4513' },
  
  // Second level platforms - reduced gaps
  { position: [29, 6, 0], size: [5, 0.5, 2.5], color: '#8B4513' },
  { position: [36, 7, 0], size: [5, 0.5, 2.5], color: '#8B4513' },
  { position: [43, 8, 0], size: [5, 0.5, 2.5], color: '#8B4513' },
  
  // Challenge platforms - closer together
  { position: [50, 9, 0], size: [3, 0.5, 2], color: '#FF6347' },
  { position: [55, 9, 0], size: [3, 0.5, 2], color: '#FF6347' },
  { position: [60, 8.5, 0], size: [3, 0.5, 2], color: '#FF6347' },
  { position: [65, 8, 0], size: [3, 0.5, 2], color: '#FF6347' },
  
  // Goal platform
  { position: [71, 7, 0], size: [10, 0.5, 3], color: '#FFD700' },
]

// Coin positions scattered around the level (adjusted for new layout)
const coinPositions = [
  [5, 2, 0], [12, 3.5, 0], [18, 4.5, 0], [24, 5.5, 0],
  [31, 7, 0], [38, 8, 0], [45, 9, 0], [52, 10, 0],
  [57, 10, 0], [62, 9.5, 0], [67, 9, 0], [73, 8, 0],
  // Extra coins at ground level
  [8, 1.5, 0], [28, 1.5, 0], [48, 1.5, 0], [68, 1.5, 0]
]

// Checkpoints with dialog data
const checkpointsData = [
  {
    id: 'checkpoint-1',
    position: [2, 1.5, 0],  // At spawn point
    dialog: {
      characterName: 'Guide',
      dialogText: 'Welcome to the adventure! You\'re a founder in this messy market! You need to find a way to stand out and be successful!',
      characterImage: null
    }
  },
  {
    id: 'checkpoint-2',
    position: [45, 9, 0],
    dialog: {
      characterName: 'Warning',
      dialogText: 'Beware! A powerful investor guards the end of this path. You can shoot him to get his attention, with your ideas!',
      characterImage: null
    }
  },
  {
    id: 'checkpoint-3',
    position: [70, 8, 0],
    dialog: {
      characterName: 'Final Challenge',
      dialogText: 'You made it! You can now pitch your idea to the investor!',
      characterImage: null
    }
  }
]

function Level() {
  const { collectedCoins, reachedCheckpoints } = useGame()
  
  useEffect(() => {
    // Store level data globally for collision detection
    window.platformsData = levelData
    window.coinsData = coinPositions
    window.checkpointsData = checkpointsData
  }, [])

  return (
    <group>
      {/* Background 2D */}
      <Background />
      
      {/* Platforms */}
      {levelData.map((platform, index) => (
        <Platform
          key={index}
          position={platform.position}
          size={platform.size}
          color={platform.color}
        />
      ))}
      
      {/* Ground plane */}
      <mesh position={[50, -0.5, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[250, 20]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>

      {/* Decorative bushes */}
      {[5, 15, 25, 35, 55, 75, 95].map((x, i) => (
        <mesh key={`bush-${i}`} position={[x, 0.8, 1.5]}>
          <sphereGeometry args={[0.6, 8, 8]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      ))}
      
      {/* Coins */}
      {coinPositions.map((position, index) => {
        const coinId = `coin-${index}`
        // Only render coin if not collected
        if (collectedCoins.includes(coinId)) return null
        return <Coin key={coinId} id={coinId} position={position} />
      })}
      
      {/* Checkpoints */}
      {checkpointsData.map((checkpoint) => {
        const isActive = !reachedCheckpoints.includes(checkpoint.id)
        return (
          <Checkpoint
            key={checkpoint.id}
            id={checkpoint.id}
            position={checkpoint.position}
            active={isActive}
          />
        )
      })}
    </group>
  )
}

export default Level

