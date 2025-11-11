import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboard } from '../hooks/useKeyboard'
import { useGame } from '../store/useGame'
import * as THREE from 'three'

const GRAVITY = -0.03
const JUMP_FORCE = 0.5
const MOVE_SPEED = 0.15
const PLAYER_SIZE = 0.8
const SHOOT_COOLDOWN = 300 // ms tra uno sparo e l'altro

function Player() {
  const meshRef = useRef()
  const keys = useKeyboard()
  const { takeDamage, gameOver, addBullet } = useGame()
  
  const [position, setPosition] = useState([0, 2, 0])
  const [velocity, setVelocity] = useState([0, 0, 0])
  const [isOnGround, setIsOnGround] = useState(false)
  const [facingDirection, setFacingDirection] = useState(1) // 1 = destra, -1 = sinistra
  const lastShootTime = useRef(0)

  useEffect(() => {
    // Store player position globally for camera
    window.playerPosition = { x: position[0], y: position[1], z: position[2] }
  }, [position])

  useFrame(() => {
    if (gameOver) return

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

    // Death condition (fall below level)
    if (newY < -10) {
      takeDamage(50) // Perde metà vita cadendo
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

  return (
    <mesh ref={meshRef} castShadow data-player position={position}>
      <boxGeometry args={[PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE]} />
      <meshStandardMaterial color="#ff0000" />
    </mesh>
  )
}

export default Player

