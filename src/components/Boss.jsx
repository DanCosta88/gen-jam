import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGame } from '../store/useGame'

const BOSS_SIZE = 2
const BOSS_SHOOT_COOLDOWN = 2000 // Shoot every 2 seconds
const BOSS_POSITION = [75, 9, 0] // At the end of the map

function Boss() {
  const meshRef = useRef()
  const { addBossProjectile, isPaused } = useGame()
  const lastShootTime = useRef(0)
  const [bossColor, setBossColor] = useState('#8B008B') // Dark magenta

  useEffect(() => {
    // Initialize boss projectiles positions tracker
    if (!window.bossProjectilesPositions) {
      window.bossProjectilesPositions = {}
    }
  }, [])

  useFrame(() => {
    if (isPaused) return

    const now = Date.now()
    
    // Get player position
    const playerPosition = window.playerPosition || { x: 0, y: 2, z: 0 }
    
    // Calculate distance to player
    const distance = Math.sqrt(
      Math.pow(BOSS_POSITION[0] - playerPosition.x, 2) +
      Math.pow(BOSS_POSITION[1] - playerPosition.y, 2)
    )

    // Only shoot if player is close enough (within 30 units)
    if (distance < 30 && now - lastShootTime.current > BOSS_SHOOT_COOLDOWN) {
      lastShootTime.current = now
      
      // Calculate direction to player
      const dx = playerPosition.x - BOSS_POSITION[0]
      const dy = playerPosition.y - BOSS_POSITION[1]
      const length = Math.sqrt(dx * dx + dy * dy)
      
      const direction = {
        x: dx / length,
        y: dy / length
      }

      // Create projectile
      const projectileId = `boss-projectile-${now}-${Math.random()}`
      addBossProjectile({
        id: projectileId,
        position: [BOSS_POSITION[0] - 1, BOSS_POSITION[1], BOSS_POSITION[2]],
        direction: direction
      })

      // Flash red when shooting
      setBossColor('#FF0000')
      setTimeout(() => setBossColor('#8B008B'), 200)
    }

    // Slight floating animation
    if (meshRef.current) {
      meshRef.current.position.y = BOSS_POSITION[1] + Math.sin(Date.now() * 0.001) * 0.3
    }
  })

  return (
    <group position={BOSS_POSITION}>
      {/* Boss body */}
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[BOSS_SIZE, BOSS_SIZE, BOSS_SIZE]} />
        <meshStandardMaterial 
          color={bossColor}
          emissive={bossColor}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Boss eyes */}
      <mesh position={[-0.3, 0.3, BOSS_SIZE / 2 + 0.01]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.3, 0.3, BOSS_SIZE / 2 + 0.01]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={1} />
      </mesh>

      {/* Crown/horns */}
      <mesh position={[0, BOSS_SIZE / 2 + 0.3, 0]}>
        <coneGeometry args={[0.4, 0.8, 4]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  )
}

export default Boss
