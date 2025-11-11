import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Coin({ position, id }) {
  const meshRef = useRef()

  // Rotate coin and make it bob up and down
  useFrame((state) => {
    if (!meshRef.current) return
    
    // Rotation
    meshRef.current.rotation.y += 0.05
    
    // Bobbing animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2
  })

  return (
    <mesh ref={meshRef} position={position} userData={{ type: 'coin', id }}>
      {/* Coin shape - cylinder */}
      <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
      <meshStandardMaterial 
        color="#FFD700" 
        metalness={0.8}
        roughness={0.2}
        emissive="#FFA500"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

export default Coin

