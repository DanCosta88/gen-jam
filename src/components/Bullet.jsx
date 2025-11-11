import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGame } from '../store/useGame'

const BULLET_SPEED = 0.5
const BULLET_LIFETIME = 3000 // 3 seconds

function Bullet({ id, position, direction }) {
  const meshRef = useRef()
  const { removeBullet, damageBoss, bossDefeated } = useGame()
  const spawnTime = useRef(Date.now())

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
    <mesh ref={meshRef} position={position}>
      <circleGeometry args={[0.2, 16]} />
      <meshStandardMaterial 
        color="#FFFF00" 
        emissive="#FFFF00" 
        emissiveIntensity={0.5}
        side={2}
      />
    </mesh>
  )
}

export default Bullet

