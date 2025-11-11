import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Checkpoint({ position, id, active = true }) {
  const meshRef = useRef()

  // Rotation and glow animation
  useFrame((state) => {
    if (!meshRef.current || !active) return
    
    // Rotation
    meshRef.current.rotation.y += 0.02
    
    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.3
  })

  return (
    <group position={position}>
      {/* Checkpoint flag/marker */}
      <mesh ref={meshRef} userData={{ type: 'checkpoint', id }}>
        <cylinderGeometry args={[0.4, 0.4, 1.5, 6]} />
        <meshStandardMaterial 
          color={active ? "#00FF00" : "#888888"}
          emissive={active ? "#00FF00" : "#444444"}
          emissiveIntensity={active ? 0.5 : 0.1}
        />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      
      {/* Glow ring (only if active) */}
      {active && (
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.8, 32]} />
          <meshBasicMaterial 
            color="#00FF00" 
            transparent 
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  )
}

export default Checkpoint

