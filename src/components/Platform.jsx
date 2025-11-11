import React from 'react'

function Platform({ position, size, color = '#8B4513' }) {
  // Convert 3D size to 2D plane (width x height, ignore depth)
  const [width, height, depth] = size
  
  return (
    <mesh position={position} receiveShadow rotation={[0, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color={color} side={2} />
    </mesh>
  )
}

export default Platform

