import { useFrame, useThree } from '@react-three/fiber'

function Camera() {
  const { camera } = useThree()

  useFrame(() => {
    // Get player position from global window object
    const playerPosition = window.playerPosition || { x: 0, y: 2, z: 0 }

    // Side-scrolling camera - only follows player's X axis
    // Maintains fixed Y and Z position for 2D effect
    const targetX = playerPosition.x
    const targetY = 5 // Fixed camera height
    const targetZ = 15 // Fixed distance from scene

    // Smooth camera follow (X axis only)
    camera.position.x += (targetX - camera.position.x) * 0.1
    camera.position.y += (targetY - camera.position.y) * 0.05
    camera.position.z = targetZ

    // Camera always looks at the player
    camera.lookAt(playerPosition.x, playerPosition.y + 2, 0)
  })

  return null
}

export default Camera

