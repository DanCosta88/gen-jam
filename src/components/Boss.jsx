import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGame } from '../store/useGame'

const BOSS_SIZE = 2
const BOSS_SHOOT_COOLDOWN = 2000 // Shoot every 2 seconds
const BOSS_POSITION = [75, 9, 0] // At the end of the map

function Boss() {
  const meshRef = useRef()
  const { addBossProjectile, isPaused, bossDefeated, bossHealth } = useGame()
  const lastShootTime = useRef(0)
  const prevBossHealth = useRef(3)
  const [bossColor, setBossColor] = useState('#8B008B') // Dark magenta

  // Flash when taking damage
  useEffect(() => {
    if (bossHealth < prevBossHealth.current) {
      setBossColor('#FFFFFF')
      setTimeout(() => setBossColor('#8B008B'), 150)
    }
    prevBossHealth.current = bossHealth
  }, [bossHealth])

  useEffect(() => {
    // Initialize boss projectiles positions tracker
    if (!window.bossProjectilesPositions) {
      window.bossProjectilesPositions = {}
    }
    
    // Store boss position and size for collision detection
    window.bossData = {
      position: BOSS_POSITION,
      size: BOSS_SIZE
    }
  }, [])

  useFrame(() => {
    if (isPaused || bossDefeated) return

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
      
      // Update boss position globally for collision
      window.bossData = {
        position: [BOSS_POSITION[0], meshRef.current.position.y, BOSS_POSITION[2]],
        size: BOSS_SIZE
      }
    }
  })

  // Don't render if boss is defeated
  if (bossDefeated) return null

  return (
    <group position={BOSS_POSITION}>
      {/* Boss body - 2D plane */}
      <mesh ref={meshRef} castShadow>
        <planeGeometry args={[BOSS_SIZE, BOSS_SIZE]} />
        <meshStandardMaterial 
          color={bossColor}
          emissive={bossColor}
          emissiveIntensity={0.3}
          side={2}
        />
      </mesh>
      
      {/* Boss eyes */}
      <mesh position={[-0.3, 0.3, 0.01]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.3, 0.3, 0.01]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={1} />
      </mesh>

      {/* Crown/horns - 2D triangle */}
      <mesh position={[0, BOSS_SIZE / 2 + 0.3, 0.01]}>
        <coneGeometry args={[0.4, 0.8, 3]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, -0.2, 0.01]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )
}

export default Boss
