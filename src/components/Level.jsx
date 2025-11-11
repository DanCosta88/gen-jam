import { useEffect } from 'react'
import Platform from './Platform'
import Background from './Background'

// Level data - platforms configuration per side-scrolling 2D
const levelData = [
  // Ground platforms - base lungo
  { position: [0, 0, 0], size: [15, 0.5, 3], color: '#228B22' },
  { position: [20, 0, 0], size: [12, 0.5, 3], color: '#228B22' },
  { position: [38, 0, 0], size: [10, 0.5, 3], color: '#228B22' },
  { position: [54, 0, 0], size: [15, 0.5, 3], color: '#228B22' },
  
  // First level platforms - piattaforme medie
  { position: [10, 2.5, 0], size: [4, 0.5, 2.5], color: '#8B4513' },
  { position: [17, 4, 0], size: [4, 0.5, 2.5], color: '#8B4513' },
  { position: [25, 5.5, 0], size: [4, 0.5, 2.5], color: '#8B4513' },
  
  // Second level platforms - piattaforme alte
  { position: [32, 7, 0], size: [5, 0.5, 2.5], color: '#8B4513' },
  { position: [42, 8.5, 0], size: [4, 0.5, 2.5], color: '#8B4513' },
  { position: [50, 10, 0], size: [4, 0.5, 2.5], color: '#8B4513' },
  
  // Challenge platforms - piattaforme strette
  { position: [58, 11, 0], size: [2.5, 0.5, 2], color: '#FF6347' },
  { position: [63, 10, 0], size: [2.5, 0.5, 2], color: '#FF6347' },
  { position: [68, 9, 0], size: [2.5, 0.5, 2], color: '#FF6347' },
  { position: [73, 8, 0], size: [2.5, 0.5, 2], color: '#FF6347' },
  
  // Goal platform
  { position: [80, 7, 0], size: [8, 0.5, 3], color: '#FFD700' },
  
  // Extra platforms per varietà
  { position: [90, 5, 0], size: [6, 0.5, 2.5], color: '#8B4513' },
  { position: [100, 3, 0], size: [8, 0.5, 3], color: '#228B22' },
]

function Level() {
  useEffect(() => {
    // Store level data globally for collision detection
    window.platformsData = levelData
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
    </group>
  )
}

export default Level

