import React from 'react'

function Platform({ position, size, color = '#8B4513' }) {
  return (
    <mesh position={position} receiveShadow castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default Platform

