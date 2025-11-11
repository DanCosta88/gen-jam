import React from 'react'
import { useTexture } from '@react-three/drei'

function Background() {
  return (
    <group>
      {/* Sky gradient background */}
      <mesh position={[0, 10, -10]} receiveShadow={false}>
        <planeGeometry args={[200, 40]} />
        <meshBasicMaterial 
          color="#87CEEB"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Mountains in the back */}
      <mesh position={[-20, 5, -8]} receiveShadow={false}>
        <coneGeometry args={[5, 10, 4]} />
        <meshBasicMaterial color="#8B7355" />
      </mesh>
      <mesh position={[0, 6, -8]} receiveShadow={false}>
        <coneGeometry args={[6, 12, 4]} />
        <meshBasicMaterial color="#A0826D" />
      </mesh>
      <mesh position={[20, 5, -8]} receiveShadow={false}>
        <coneGeometry args={[5, 10, 4]} />
        <meshBasicMaterial color="#8B7355" />
      </mesh>
      <mesh position={[40, 6, -8]} receiveShadow={false}>
        <coneGeometry args={[6, 12, 4]} />
        <meshBasicMaterial color="#A0826D" />
      </mesh>

      {/* Clouds */}
      {[...Array(15)].map((_, i) => (
        <group key={`cloud-${i}`} position={[i * 10 - 20, 12 + Math.random() * 4, -6]}>
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
        <meshBasicMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export default Background

