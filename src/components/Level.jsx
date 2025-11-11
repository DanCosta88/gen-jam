import { useEffect } from 'react'
import Platform from './Platform'

// Level data - platforms configuration
const levelData = [
  // Ground platforms
  { position: [0, 0, 0], size: [10, 0.5, 5], color: '#228B22' },
  { position: [15, 0, 0], size: [8, 0.5, 5], color: '#228B22' },
  { position: [28, 0, 0], size: [6, 0.5, 5], color: '#228B22' },
  
  // First level platforms
  { position: [7, 2, 0], size: [3, 0.5, 3], color: '#8B4513' },
  { position: [12, 3.5, 0], size: [3, 0.5, 3], color: '#8B4513' },
  { position: [17, 5, 0], size: [3, 0.5, 3], color: '#8B4513' },
  
  // Second level platforms
  { position: [22, 6.5, 0], size: [4, 0.5, 3], color: '#8B4513' },
  { position: [27, 8, 0], size: [3, 0.5, 3], color: '#8B4513' },
  
  // Higher platforms
  { position: [32, 10, 0], size: [5, 0.5, 3], color: '#8B4513' },
  { position: [38, 12, 0], size: [4, 0.5, 3], color: '#8B4513' },
  
  // Challenge platforms (narrow)
  { position: [43, 11, 0], size: [2, 0.5, 2], color: '#FF6347' },
  { position: [47, 10, 0], size: [2, 0.5, 2], color: '#FF6347' },
  { position: [51, 9, 0], size: [2, 0.5, 2], color: '#FF6347' },
  
  // Goal platform
  { position: [55, 8, 0], size: [6, 0.5, 5], color: '#FFD700' },
  
  // Side walls (to prevent falling off sideways)
  { position: [0, 5, -3], size: [100, 20, 1], color: '#4682B4' },
  { position: [0, 5, 3], size: [100, 20, 1], color: '#4682B4' },
]

function Level() {
  useEffect(() => {
    // Store level data globally for collision detection
    window.platformsData = levelData
  }, [])

  return (
    <group>
      {levelData.map((platform, index) => (
        <Platform
          key={index}
          position={platform.position}
          size={platform.size}
          color={platform.color}
        />
      ))}
      
      {/* Decorative elements */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>

      {/* Clouds */}
      {[...Array(10)].map((_, i) => (
        <mesh key={`cloud-${i}`} position={[i * 8 - 10, 15 + Math.random() * 5, -8]}>
          <sphereGeometry args={[1 + Math.random(), 8, 8]} />
          <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
        </mesh>
      ))}
    </group>
  )
}

export default Level

