import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

function Camera() {
  const { camera } = useThree()
  const playerRef = useRef()

  useFrame(() => {
    // Find player in the scene
    const player = document.querySelector('[data-player]')
    if (!player) return

    // Get player position from the DOM
    const playerPosition = window.playerPosition || { x: 0, y: 2, z: 0 }

    // Smooth camera follow
    camera.position.x += (playerPosition.x - camera.position.x) * 0.05
    camera.position.y += (playerPosition.y + 5 - camera.position.y) * 0.05
    camera.lookAt(playerPosition.x, playerPosition.y, 0)
  })

  return null
}

export default Camera

