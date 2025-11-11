import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGame } from '../store/useGame'

const PROJECTILE_SPEED = 0.3
const PROJECTILE_LIFETIME = 5000 // 5 seconds

function BossProjectile({ id, position, direction }) {
  const meshRef = useRef()
  const { removeBossProjectile } = useGame()
  const spawnTime = useRef(Date.now())

  useFrame(() => {
    if (!meshRef.current) return

    // Projectile movement (moves towards player)
    meshRef.current.position.x += direction.x * PROJECTILE_SPEED
    meshRef.current.position.y += direction.y * PROJECTILE_SPEED

    // Remove projectile if out of bounds or lifetime expired
    if (
      Math.abs(meshRef.current.position.x) > 100 ||
      Math.abs(meshRef.current.position.y) > 50 ||
      Date.now() - spawnTime.current > PROJECTILE_LIFETIME
    ) {
      removeBossProjectile(id)
    }

    // Store position globally for collision detection
    if (window.bossProjectilesPositions) {
      window.bossProjectilesPositions[id] = {
        x: meshRef.current.position.x,
        y: meshRef.current.position.y,
        z: meshRef.current.position.z
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.25, 8, 8]} />
      <meshStandardMaterial 
        color="#FF0000" 
        emissive="#FF4500" 
        emissiveIntensity={0.8}
      />
    </mesh>
  )
}

export default BossProjectile
