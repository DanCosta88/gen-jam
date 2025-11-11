import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGame } from '../store/useGame'

const BULLET_SPEED = 0.5
const BULLET_LIFETIME = 3000 // 3 seconds

function Bullet({ id, position, direction }) {
  const meshRef = useRef()
  const { removeBullet } = useGame()
  const spawnTime = useRef(Date.now())

  useFrame(() => {
    if (!meshRef.current) return

    // Bullet movement
    meshRef.current.position.x += direction * BULLET_SPEED

    // Remove bullet if out of bounds or lifetime expired
    if (
      Math.abs(meshRef.current.position.x) > 100 ||
      Date.now() - spawnTime.current > BULLET_LIFETIME
    ) {
      removeBullet(id)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial 
        color="#FFFF00" 
        emissive="#FFFF00" 
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

export default Bullet

