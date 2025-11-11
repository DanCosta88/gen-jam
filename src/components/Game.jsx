import React from 'react'
import { Canvas } from '@react-three/fiber'
import Level from './Level'
import Player from './Player'
import Camera from './Camera'
import Bullet from './Bullet'
import Boss from './Boss'
import BossProjectile from './BossProjectile'
import { useGame } from '../store/useGame'

function Game() {
  const { bullets, bossProjectiles } = useGame()

  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 15], fov: 60 }}
      frameloop="always"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
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
      <Boss />
      
      {/* Player Bullets */}
      {bullets.map((bullet) => (
        <Bullet
          key={bullet.id}
          id={bullet.id}
          position={bullet.position}
          direction={bullet.direction}
        />
      ))}
      
      {/* Boss Projectiles */}
      {bossProjectiles.map((projectile) => (
        <BossProjectile
          key={projectile.id}
          id={projectile.id}
          position={projectile.position}
          direction={projectile.direction}
        />
      ))}
      
      <Camera />
    </Canvas>
  )
}

export default Game

