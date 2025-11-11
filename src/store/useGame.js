import { create } from 'zustand'

// Character data
export const CHARACTERS = [
  { id: 'aura', name: 'Aura', color: '#FF1493', emoji: '✨' },
  { id: 'danilo', name: 'Danilo', color: '#4169E1', emoji: '⚡' },
  { id: 'andre', name: 'Andre', color: '#32CD32', emoji: '🌿' },
  { id: 'arun', name: 'Arun', color: '#FF4500', emoji: '🔥' },
  { id: 'yashodh', name: 'Yashodh', color: '#9370DB', emoji: '🌟' }
]

export const useGame = create((set) => ({
  score: 0,
  health: 100,
  maxHealth: 100,
  gameOver: false,
  isPaused: false,
  bullets: [],
  bossProjectiles: [],
  collectedCoins: [],
  reachedCheckpoints: [],
  currentDialog: null,
  isDialogOpen: false,
  bossHealth: 3,
  bossMaxHealth: 3,
  bossDefeated: false,
  selectedCharacter: null,
  
  selectCharacter: (character) => set({ selectedCharacter: character }),
  
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  
  setPause: (paused) => set({ isPaused: paused }),
  
  addScore: (points) => set((state) => ({ score: state.score + points })),
  
  collectCoin: (coinId) => set((state) => ({
    collectedCoins: [...state.collectedCoins, coinId],
    score: state.score + 5
  })),
  
  reachCheckpoint: (checkpointId) => set((state) => ({
    reachedCheckpoints: [...state.reachedCheckpoints, checkpointId]
  })),
  
  showDialog: (dialogData) => set({
    currentDialog: dialogData,
    isDialogOpen: true,
    isPaused: true
  }),
  
  closeDialog: () => set({
    isDialogOpen: false,
    isPaused: false
  }),
  
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
  
  addBossProjectile: (projectile) => set((state) => ({
    bossProjectiles: [...state.bossProjectiles, projectile]
  })),
  
  removeBossProjectile: (id) => set((state) => ({
    bossProjectiles: state.bossProjectiles.filter(p => p.id !== id)
  })),
  
  damageBoss: () => set((state) => {
    const newHealth = Math.max(0, state.bossHealth - 1)
    return {
      bossHealth: newHealth,
      bossDefeated: newHealth <= 0,
      score: newHealth <= 0 ? state.score + 100 : state.score + 10 // Bonus for killing boss
    }
  }),
  
  resetGame: () => set({
    score: 0,
    health: 100,
    gameOver: false,
    bullets: [],
    bossProjectiles: [],
    collectedCoins: [],
    reachedCheckpoints: [],
    currentDialog: null,
    isDialogOpen: false,
    bossHealth: 3,
    bossDefeated: false,
    isPaused: false
  })
}))

