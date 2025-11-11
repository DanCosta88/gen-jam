import React from 'react'

// San Francisco inspired buildings
const SF_BUILDINGS = [
  // Transamerica Pyramid style
  { position: [-30, 8, -15], size: [3, 16, 3], type: 'pyramid', color: '#C0C0C0' },
  
  // Salesforce Tower style (tall)
  { position: [-20, 12, -15], size: [4, 24, 4], type: 'tower', color: '#B0C4DE' },
  
  // Various skyscrapers
  { position: [-10, 7, -15], size: [3, 14, 3], type: 'box', color: '#778899' },
  { position: [-5, 5, -15], size: [2.5, 10, 2.5], type: 'box', color: '#A9A9A9' },
  { position: [0, 9, -15], size: [3.5, 18, 3.5], type: 'box', color: '#8B9DC3' },
  { position: [8, 6, -15], size: [3, 12, 3], type: 'box', color: '#B8B8B8' },
  { position: [15, 10, -15], size: [4, 20, 4], type: 'tower', color: '#9FB6CD' },
  { position: [25, 7, -15], size: [3, 14, 3], type: 'box', color: '#A8A8A8' },
  { position: [32, 5, -15], size: [2.5, 10, 2.5], type: 'box', color: '#C0C0C0' },
  
  // More buildings in the back
  { position: [40, 8, -15], size: [3, 16, 3], type: 'box', color: '#778899' },
  { position: [50, 6, -15], size: [3.5, 12, 3.5], type: 'box', color: '#A9A9A9' },
  { position: [60, 9, -15], size: [4, 18, 4], type: 'tower', color: '#B0C4DE' },
  { position: [70, 7, -15], size: [3, 14, 3], type: 'box', color: '#8B9DC3' },
  { position: [80, 11, -15], size: [4, 22, 4], type: 'tower', color: '#9FB6CD' },
  { position: [90, 6, -15], size: [3, 12, 3], type: 'box', color: '#C0C0C0' },
  { position: [100, 8, -15], size: [3.5, 16, 3.5], type: 'box', color: '#778899' },
  
  // Smaller buildings in front
  { position: [-25, 3, -12], size: [2, 6, 2], type: 'box', color: '#D3D3D3' },
  { position: [-15, 4, -12], size: [2.5, 8, 2.5], type: 'box', color: '#C0C0C0' },
  { position: [10, 3.5, -12], size: [2, 7, 2], type: 'box', color: '#B8B8B8' },
  { position: [20, 4, -12], size: [2.5, 8, 2.5], type: 'box', color: '#D3D3D3' },
  { position: [45, 3, -12], size: [2, 6, 2], type: 'box', color: '#C0C0C0' },
  { position: [65, 4, -12], size: [2.5, 8, 2.5], type: 'box', color: '#A9A9A9' },
  { position: [85, 3.5, -12], size: [2, 7, 2], type: 'box', color: '#B8B8B8' },
]

function Building({ position, size, type, color }) {
  const [width, height, depth] = size
  
  if (type === 'pyramid') {
    return (
      <mesh position={position} castShadow>
        <coneGeometry args={[width, height, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
    )
  }
  
  if (type === 'tower') {
    return (
      <group position={position}>
        {/* Main tower */}
        <mesh castShadow>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Windows pattern */}
        {[...Array(Math.floor(height / 2))].map((_, i) => (
          <mesh key={i} position={[0, -height / 2 + i * 2 + 1, depth / 2 + 0.01]}>
            <planeGeometry args={[width * 0.7, 0.3]} />
            <meshBasicMaterial color="#FFFF99" opacity={0.8} transparent />
          </mesh>
        ))}
      </group>
    )
  }
  
  // Default box building
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Simple windows */}
      {[...Array(Math.floor(height / 2))].map((_, i) => (
        <mesh key={i} position={[0, -height / 2 + i * 2 + 0.5, depth / 2 + 0.01]}>
          <planeGeometry args={[width * 0.6, 0.2]} />
          <meshBasicMaterial color="#FFFFCC" opacity={0.7} transparent />
        </mesh>
      ))}
    </group>
  )
}

function GoldenGateBridge() {
  return (
    <group position={[50, 5, -20]}>
      {/* Main towers */}
      <mesh position={[-15, 10, 0]}>
        <boxGeometry args={[2, 20, 2]} />
        <meshStandardMaterial color="#C04000" />
      </mesh>
      <mesh position={[15, 10, 0]}>
        <boxGeometry args={[2, 20, 2]} />
        <meshStandardMaterial color="#C04000" />
      </mesh>
      
      {/* Bridge deck */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[32, 0.5, 3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Cables (simplified) */}
      {[-15, -5, 5, 15].map((x, i) => (
        <mesh key={i} position={[x, 12, 0]} rotation={[0, 0, x < 0 ? -0.3 : 0.3]}>
          <cylinderGeometry args={[0.05, 0.05, 12, 8]} />
          <meshStandardMaterial color="#C04000" />
        </mesh>
      ))}
      
      {/* Top cables */}
      <mesh position={[0, 19, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 30, 8]} />
        <meshStandardMaterial color="#C04000" />
      </mesh>
    </group>
  )
}

function SanFranciscoBackground() {
  return (
    <group>
      {/* Golden Gate Bridge */}
      <GoldenGateBridge />
      
      {/* Buildings */}
      {SF_BUILDINGS.map((building, index) => (
        <Building
          key={`building-${index}`}
          position={building.position}
          size={building.size}
          type={building.type}
          color={building.color}
        />
      ))}
      
      {/* Fog/Atmosphere effect - moved further back to avoid z-fighting */}
      <mesh position={[50, 10, -26]}>
        <planeGeometry args={[250, 40]} />
        <meshBasicMaterial color="#E6F2FF" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

export default SanFranciscoBackground

