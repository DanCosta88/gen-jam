import { create } from 'zustand'

export const useGame = create((set) => ({
  score: 0,
  health: 100,
  maxHealth: 100,
  gameOver: false,
  bullets: [],
  
  addScore: (points) => set((state) => ({ score: state.score + points })),
  
  takeDamage: (damage) => set((state) => {
    const newHealth = Math.max(0, state.health - damage)
    return {
      health: newHealth,
      gameOver: newHealth <= 0
    }
  }),
  
  heal: (amount) => set((state) => ({
    health: Math.min(state.maxHealth, state.health + amount)
  })),
  
  addBullet: (bullet) => set((state) => ({
    bullets: [...state.bullets, bullet]
  })),
  
  removeBullet: (id) => set((state) => ({
    bullets: state.bullets.filter(b => b.id !== id)
  })),
  
  resetGame: () => set({
    score: 0,
    health: 100,
    gameOver: false,
    bullets: []
  })
}))

