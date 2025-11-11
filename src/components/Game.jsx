import React from 'react'
import { Canvas } from '@react-three/fiber'
import Level from './Level'
import Player from './Player'
import Camera from './Camera'
import Bullet from './Bullet'
import { useGame } from '../store/useGame'

function Game() {
  const { bullets } = useGame()

  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 15], fov: 60 }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Game components */}
      <Player />
      <Level />
      
      {/* Bullets */}
      {bullets.map((bullet) => (
        <Bullet
          key={bullet.id}
          id={bullet.id}
          position={bullet.position}
          direction={bullet.direction}
        />
      ))}
      
      <Camera />
    </Canvas>
  )
}

export default Game

