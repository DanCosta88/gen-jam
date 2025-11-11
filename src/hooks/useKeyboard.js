import { useEffect, useState } from 'react'

export const useKeyboard = () => {
  const [keys, setKeys] = useState({
    left: false,
    right: false,
    jump: false,
    shoot: false,
    escape: false
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          setKeys((prev) => ({ ...prev, left: true }))
          break
        case 'ArrowRight':
        case 'KeyD':
          setKeys((prev) => ({ ...prev, right: true }))
          break
        case 'Space':
        case 'KeyW':
        case 'ArrowUp':
          setKeys((prev) => ({ ...prev, jump: true }))
          break
        case 'KeyF':
          setKeys((prev) => ({ ...prev, shoot: true }))
          break
        case 'Escape':
          setKeys((prev) => ({ ...prev, escape: true }))
          break
        default:
          break
      }
    }

    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          setKeys((prev) => ({ ...prev, left: false }))
          break
        case 'ArrowRight':
        case 'KeyD':
          setKeys((prev) => ({ ...prev, right: false }))
          break
        case 'Space':
        case 'KeyW':
        case 'ArrowUp':
          setKeys((prev) => ({ ...prev, jump: false }))
          break
        case 'KeyF':
          setKeys((prev) => ({ ...prev, shoot: false }))
          break
        case 'Escape':
          setKeys((prev) => ({ ...prev, escape: false }))
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return keys
}

