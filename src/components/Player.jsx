import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboard } from '../hooks/useKeyboard'
import { useGame } from '../store/useGame'

const GRAVITY = -0.015  // Reduced gravity for slower, longer jumps
const JUMP_FORCE = 0.35  // Reduced jump force for more controlled jumps
const MOVE_SPEED = 0.15
const PLAYER_SIZE = 0.8
const SHOOT_COOLDOWN = 300 // ms between shots

function Player() {
  const meshRef = useRef()
  const keys = useKeyboard()
  const { takeDamage, gameOver, addBullet, selectedCharacter, isPaused, collectCoin, collectedCoins, reachCheckpoint, reachedCheckpoints, showDialog } = useGame()
  
  const [position, setPosition] = useState([0, 2, 0])
  const [velocity, setVelocity] = useState([0, 0, 0])
  const [isOnGround, setIsOnGround] = useState(false)
  const [facingDirection, setFacingDirection] = useState(1) // 1 = right, -1 = left
  const lastShootTime = useRef(0)

  useEffect(() => {
    // Store player position globally for camera
    window.playerPosition = { x: position[0], y: position[1], z: position[2] }
  }, [position])

  useFrame(() => {
    if (gameOver || isPaused) return

    const [x, y, z] = position
    let [vx, vy, vz] = velocity

    // Apply gravity
    vy += GRAVITY

    // Horizontal movement
    if (keys.left) {
      vx = -MOVE_SPEED
      setFacingDirection(-1)
    } else if (keys.right) {
      vx = MOVE_SPEED
      setFacingDirection(1)
    } else {
      vx *= 0.8 // Friction
    }

    // Jump
    if (keys.jump && isOnGround) {
      vy = JUMP_FORCE
      setIsOnGround(false)
    }

    // Shoot
    if (keys.shoot) {
      const now = Date.now()
      if (now - lastShootTime.current > SHOOT_COOLDOWN) {
        lastShootTime.current = now
        const bulletId = `bullet-${now}-${Math.random()}`
        addBullet({
          id: bulletId,
          position: [x + (facingDirection * 0.6), y, z],
          direction: facingDirection
        })
      }
    }

    // Update position
    let newX = x + vx
    let newY = y + vy
    let newZ = z + vz

    // Collision detection with platforms
    let onGround = false
    const platforms = window.platformsData || []
    
    for (const platform of platforms) {
      const [px, py, pz] = platform.position
      const [sx, sy, sz] = platform.size

      // Check if player is above platform
      if (
        newX + PLAYER_SIZE / 2 > px - sx / 2 &&
        newX - PLAYER_SIZE / 2 < px + sx / 2 &&
        newZ + PLAYER_SIZE / 2 > pz - sz / 2 &&
        newZ - PLAYER_SIZE / 2 < pz + sz / 2
      ) {
        // Check vertical collision
        if (vy < 0 && y > py + sy / 2 && newY - PLAYER_SIZE / 2 <= py + sy / 2) {
          newY = py + sy / 2 + PLAYER_SIZE / 2
          vy = 0
          onGround = true
        }
      }
    }

    setIsOnGround(onGround)

    // Coin collision detection
    const coins = window.coinsData || []
    const COIN_RADIUS = 0.3
    
    for (let i = 0; i < coins.length; i++) {
      const coinId = `coin-${i}`
      // Skip if already collected
      if (collectedCoins.includes(coinId)) continue
      
      const [cx, cy, cz] = coins[i]
      const distance = Math.sqrt(
        Math.pow(newX - cx, 2) +
        Math.pow(newY - cy, 2) +
        Math.pow(newZ - cz, 2)
      )
      
      // Collect coin if close enough
      if (distance < PLAYER_SIZE / 2 + COIN_RADIUS) {
        collectCoin(coinId)
      }
    }

    // Boss projectile collision detection
    const bossProjectiles = window.bossProjectilesPositions || {}
    const PROJECTILE_RADIUS = 0.25
    const DAMAGE_PER_HIT = 10
    
    for (const projectileId in bossProjectiles) {
      const proj = bossProjectiles[projectileId]
      const distance = Math.sqrt(
        Math.pow(newX - proj.x, 2) +
        Math.pow(newY - proj.y, 2) +
        Math.pow(newZ - proj.z, 2)
      )
      
      // Check collision with projectile
      if (distance < PLAYER_SIZE / 2 + PROJECTILE_RADIUS) {
        takeDamage(DAMAGE_PER_HIT)
        // Remove the projectile from tracking
        delete window.bossProjectilesPositions[projectileId]
      }
    }

    // Checkpoint collision detection
    const checkpoints = window.checkpointsData || []
    const CHECKPOINT_RADIUS = 0.8
    
    for (const checkpoint of checkpoints) {
      const checkpointId = checkpoint.id
      // Skip if already reached
      if (reachedCheckpoints.includes(checkpointId)) continue
      
      const [cx, cy, cz] = checkpoint.position
      const distance = Math.sqrt(
        Math.pow(newX - cx, 2) +
        Math.pow(newY - cy, 2) +
        Math.pow(newZ - cz, 2)
      )
      
      // Check collision with checkpoint
      if (distance < PLAYER_SIZE / 2 + CHECKPOINT_RADIUS) {
        reachCheckpoint(checkpointId)
        // Show dialog
        showDialog(checkpoint.dialog)
      }
    }

    // Death condition (fall below level)
    if (newY < -10) {
      takeDamage(50) // Lose half health when falling
      newX = 0
      newY = 5
      newZ = 0
      vx = 0
      vy = 0
      vz = 0
    }

    setPosition([newX, newY, newZ])
    setVelocity([vx, vy, vz])

    // Update mesh position
    if (meshRef.current) {
      meshRef.current.position.set(newX, newY, newZ)
      window.playerPosition = { x: newX, y: newY, z: newZ }
    }
  })

  // Use character color or default red
  const playerColor = selectedCharacter ? selectedCharacter.color : '#ff0000'

  return (
    <group ref={meshRef} position={position}>
      {/* Main body - 2D plane */}
      <mesh castShadow>
        <planeGeometry args={[PLAYER_SIZE, PLAYER_SIZE]} />
        <meshStandardMaterial color={playerColor} side={2} />
      </mesh>
      
      {/* Character face/details */}
      <mesh position={[0, 0.15, 0.01]}>
        <circleGeometry args={[0.1, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.15, 0.15, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.15, 0.15, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  )
}

export default Player

