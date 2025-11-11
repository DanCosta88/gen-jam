import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useGame } from '../store/useGame'

const BULLET_SPEED = 0.08  // Extremely slow projectiles
const BULLET_LIFETIME = 8000 // 8 seconds (increased for very slow bullets)

// Startup founder phrases
const FOUNDER_PHRASES = [
  "Show me the money!",
  "Disrupt!",
  "Scale!",
  "Pivot!",
  "MVP",
  "Growth!",
  "10x",
  "Ship it!",
  "Move fast",
  "Unicorn!",
  "Innovate!",
  "Fail fast",
  "Hustle!"
]

function Bullet({ id, position, direction }) {
  const meshRef = useRef()
  const { removeBullet, damageBoss, bossDefeated } = useGame()
  const spawnTime = useRef(Date.now())
  const phrase = useRef(FOUNDER_PHRASES[Math.floor(Math.random() * FOUNDER_PHRASES.length)])

  useFrame(() => {
    if (!meshRef.current) return

    // Bullet movement
    meshRef.current.position.x += direction * BULLET_SPEED

    // Check collision with boss
    if (!bossDefeated && window.bossData) {
      const boss = window.bossData
      const [bossX, bossY, bossZ] = boss.position
      const bossSize = boss.size
      
      const bulletX = meshRef.current.position.x
      const bulletY = meshRef.current.position.y
      const bulletZ = meshRef.current.position.z
      
      // Simple AABB collision for 2D
      if (
        bulletX > bossX - bossSize / 2 &&
        bulletX < bossX + bossSize / 2 &&
        bulletY > bossY - bossSize / 2 &&
        bulletY < bossY + bossSize / 2
      ) {
        damageBoss()
        removeBullet(id)
        return
      }
    }

    // Remove bullet if out of bounds or lifetime expired
    if (
      Math.abs(meshRef.current.position.x) > 100 ||
      Date.now() - spawnTime.current > BULLET_LIFETIME
    ) {
      removeBullet(id)
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <Text
        fontSize={0.35}
        color="#FFFF00"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
        fontWeight="bold"
      >
        {phrase.current}
      </Text>
    </group>
  )
}

export default Bullet

