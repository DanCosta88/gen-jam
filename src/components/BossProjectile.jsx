import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useGame } from '../store/useGame'

const PROJECTILE_SPEED = 0.3
const PROJECTILE_LIFETIME = 5000 // 5 seconds

// Investor rejection phrases
const INVESTOR_PHRASES = [
  "I don't like your idea",
  "No market fit",
  "Too risky",
  "Not scalable",
  "Poor traction",
  "No moat",
  "Overvalued",
  "Bad unit economics",
  "Saturated market",
  "Weak team",
  "No differentiation",
  "Burn rate too high",
  "Pass"
]

function BossProjectile({ id, position, direction }) {
  const meshRef = useRef()
  const { removeBossProjectile } = useGame()
  const spawnTime = useRef(Date.now())
  const phrase = useRef(INVESTOR_PHRASES[Math.floor(Math.random() * INVESTOR_PHRASES.length)])

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
    <group ref={meshRef} position={position}>
      <Text
        fontSize={0.4}
        color="#FF0000"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="#000000"
        fontWeight="bold"
      >
        {phrase.current}
      </Text>
    </group>
  )
}

export default BossProjectile
