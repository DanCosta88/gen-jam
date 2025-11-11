import { useFrame, useThree } from '@react-three/fiber'

function Camera() {
  const { camera } = useThree()

  useFrame(() => {
    // Get player position from global window object
    const playerPosition = window.playerPosition || { x: 0, y: 2, z: 0 }

    // Side-scrolling camera - segue solo l'asse X del player
    // Mantiene una posizione fissa su Y e Z per un effetto 2D
    const targetX = playerPosition.x
    const targetY = 5 // Altezza fissa della camera
    const targetZ = 15 // Distanza fissa dalla scena

    // Smooth camera follow (solo sull'asse X)
    camera.position.x += (targetX - camera.position.x) * 0.1
    camera.position.y += (targetY - camera.position.y) * 0.05
    camera.position.z = targetZ

    // La camera guarda sempre il player
    camera.lookAt(playerPosition.x, playerPosition.y + 2, 0)
  })

  return null
}

export default Camera

