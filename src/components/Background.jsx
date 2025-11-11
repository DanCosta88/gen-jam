import React from 'react'

// Pre-generate cloud positions to avoid random changes on re-render
const CLOUD_POSITIONS = [
  [0, 13, -6], [10, 15, -6], [20, 12, -6], [30, 14, -6], [40, 13, -6],
  [50, 15, -6], [60, 12, -6], [70, 14, -6], [80, 13, -6], [90, 15, -6],
  [100, 12, -6], [110, 14, -6], [120, 13, -6], [130, 15, -6], [140, 12, -6]
]

function Background() {
  return (
    <group>
      {/* Sky gradient background */}
      <mesh position={[0, 10, -10]}>
        <planeGeometry args={[200, 40]} />
        <meshBasicMaterial 
          color="#87CEEB"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Mountains in the back */}
      <mesh position={[-20, 5, -8]}>
        <coneGeometry args={[5, 10, 4]} />
        <meshBasicMaterial color="#8B7355" />
      </mesh>
      <mesh position={[0, 6, -8]}>
        <coneGeometry args={[6, 12, 4]} />
        <meshBasicMaterial color="#A0826D" />
      </mesh>
      <mesh position={[20, 5, -8]}>
        <coneGeometry args={[5, 10, 4]} />
        <meshBasicMaterial color="#8B7355" />
      </mesh>
      <mesh position={[40, 6, -8]}>
        <coneGeometry args={[6, 12, 4]} />
        <meshBasicMaterial color="#A0826D" />
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

