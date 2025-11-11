import React from 'react'
import SanFranciscoBackground from './SanFranciscoBackground'

// Pre-generate cloud positions to avoid random changes on re-render
const CLOUD_POSITIONS = [
  [0, 13, -6], [10, 15, -6], [20, 12, -6], [30, 14, -6], [40, 13, -6],
  [50, 15, -6], [60, 12, -6], [70, 14, -6], [80, 13, -6], [90, 15, -6],
  [100, 12, -6], [110, 14, -6], [120, 13, -6], [130, 15, -6], [140, 12, -6]
]

function Background() {
  return (
    <group>
      {/* San Francisco Skyline */}
      <SanFranciscoBackground />
      {/* Sky gradient background - moved even further back */}
      <mesh position={[50, 15, -30]}>
        <planeGeometry args={[300, 60]} />
        <meshBasicMaterial 
          color="#87CEEB"
        />
      </mesh>

      {/* Clouds */}
      {CLOUD_POSITIONS.map((position, i) => (
        <group key={`cloud-${i}`} position={position}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.5, 8, 8]} />
            <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
          </mesh>
          <mesh position={[1.2, 0, 0]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
          </mesh>
          <mesh position={[-1.2, 0, 0]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
          </mesh>
        </group>
      ))}

      {/* Sun */}
      <mesh position={[30, 18, -9]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
    </group>
  )
}

export default Background

