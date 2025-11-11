import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGame } from '../store/useGame'

const BULLET_SPEED = 0.5
const BULLET_LIFETIME = 3000 // 3 secondi

function Bullet({ id, position, direction }) {
  const meshRef = useRef()
  const { removeBullet } = useGame()
  const spawnTime = useRef(Date.now())

  useFrame(() => {
    if (!meshRef.current) return

    // Movimento del proiettile
    meshRef.current.position.x += direction * BULLET_SPEED

    // Rimuovi il proiettile se è fuori schermo o se è scaduto il tempo
    if (
      Math.abs(meshRef.current.position.x) > 100 ||
      Date.now() - spawnTime.current > BULLET_LIFETIME
    ) {
      removeBullet(id)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial 
        color="#FFFF00" 
        emissive="#FFFF00" 
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

export default Bullet

