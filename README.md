# Platform Game - Gen Jam 🎮

Un platform game side-scroller 2D/3D in stile Super Mario realizzato con **React**, **Three.js** e **react-three-fiber**.

![Platform Game](https://img.shields.io/badge/React-18.2-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.158-green)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## 🎯 Caratteristiche

- **Grafica 2D/3D**: Background 2D panoramico con elementi 3D interattivi
- **Fisica realistica**: Sistema di gravità e collisioni con piattaforme
- **Controlli completi**: Movimento, salto e combattimento
- **Sistema di sparo**: Possibilità di sparare proiettili (tasto F)
- **Barra della vita**: Sistema HP con barra visuale nell'HUD
- **Side-scrolling**: Camera che segue il personaggio orizzontalmente
- **Livelli estesi**: Sistema di piattaforme progressivo con oltre 15 piattaforme
- **Background dinamico**: Montagne, nuvole e sole

## 🚀 Installazione

### Prerequisiti

- Node.js (versione 16 o superiore)
- npm o yarn

### Setup

1. Clona il repository (o naviga nella cartella del progetto)

```bash
cd gen-jam
```

2. Installa le dipendenze

```bash
npm install
```

3. Avvia il server di sviluppo

```bash
npm run dev
```

4. Apri il browser all'indirizzo `http://localhost:3000`

## 🎮 Controlli

| Tasto | Azione |
|-------|--------|
| A / ← | Muovi a sinistra |
| D / → | Muovi a destra |
| W / SPAZIO / ↑ | Salta |
| F | Spara proiettili |

## 📁 Struttura del Progetto

```
gen-jam/
├── src/
│   ├── components/
│   │   ├── Game.jsx          # Componente principale del gioco con Canvas
│   │   ├── Player.jsx         # Personaggio giocabile con fisica
│   │   ├── Platform.jsx       # Componente singola piattaforma
│   │   ├── Level.jsx          # Livello con tutte le piattaforme
│   │   └── Camera.jsx         # Camera che segue il player
│   ├── hooks/
│   │   └── useKeyboard.js     # Hook per gestire input tastiera
│   ├── store/
│   │   └── useGame.js         # Store Zustand per stato del gioco
│   ├── styles/
│   │   └── index.css          # Stili globali
│   ├── App.jsx                # Componente principale React
│   └── main.jsx               # Entry point
├── index.html                 # HTML template
├── vite.config.js            # Configurazione Vite
├── package.json              # Dipendenze
├── .gitignore               # File ignorati da Git
└── README.md                # Questo file
```

## 🎨 Personalizzazione

### Modificare il livello

Puoi modificare il livello editando l'array `levelData` in `src/components/Level.jsx`:

```javascript
const levelData = [
  { 
    position: [x, y, z],  // Posizione della piattaforma
    size: [w, h, d],      // Dimensioni (larghezza, altezza, profondità)
    color: '#hex'         // Colore
  },
  // ... altre piattaforme
]
```

### Modificare la fisica

I parametri della fisica sono definiti in `src/components/Player.jsx`:

```javascript
const GRAVITY = -0.03      // Forza di gravità
const JUMP_FORCE = 0.5     // Forza del salto
const MOVE_SPEED = 0.15    // Velocità movimento
const PLAYER_SIZE = 0.8    // Dimensione del player
```

### Personalizzare i colori

I colori principali possono essere modificati nei vari componenti:
- **Player**: `#ff0000` (rosso)
- **Piattaforme normali**: `#8B4513` (marrone)
- **Piattaforme terreno**: `#228B22` (verde)
- **Piattaforme sfida**: `#FF6347` (rosso pomodoro)
- **Piattaforma goal**: `#FFD700` (oro)

## 🔧 Tecnologie Utilizzate

- **React 18**: Framework UI
- **Three.js**: Libreria 3D
- **@react-three/fiber**: React renderer per Three.js
- **@react-three/drei**: Helper e componenti per R3F
- **Zustand**: State management leggero
- **Vite**: Build tool e dev server

## 📦 Build per Produzione

Per creare una build di produzione:

```bash
npm run build
```

I file ottimizzati saranno generati nella cartella `dist/`.

Per testare la build in locale:

```bash
npm run preview
```

## 🎯 Prossimi Sviluppi

Idee per espandere il gioco:

- [ ] Aggiungere nemici
- [ ] Sistema di checkpoint
- [ ] Collectables (monete, power-up)
- [ ] Più livelli
- [ ] Animazioni del personaggio
- [ ] Effetti sonori e musica
- [ ] Modalità multiplayer
- [ ] Classifica punteggi
- [ ] Mobile controls (touch)
- [ ] Particelle ed effetti speciali

## 🐛 Troubleshooting

### Il gioco non parte
- Verifica di aver installato tutte le dipendenze con `npm install`
- Controlla la versione di Node.js (minimo 16)

### Performance scarse
- Riduci il numero di piattaforme nel livello
- Disabilita le ombre in `Game.jsx`
- Riduci la qualità delle shadow maps

### Il player cade attraverso le piattaforme
- Verifica che le dimensioni delle piattaforme siano corrette
- Controlla che la velocità non sia troppo alta

## 📝 Licenza

Questo progetto è stato creato a scopo educativo e di apprendimento.

## 👨‍💻 Contributi

Sentiti libero di fare fork del progetto e inviare pull request per miglioramenti!

---

Buon divertimento! 🎮✨

