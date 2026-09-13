# Project Ganesha — Festival World

A sacred, intimate Ganesh Chaturthi celebration web experience dedicated to **Bangaram ❤️**.

---

## 🏛️ Project Architecture

```
ganesha-experience/
├── index.html          # Clean structural entry point & minimal sacred sound badge
├── css/
│   └── style.css       # Design tokens, typography, glassmorphism, responsive queries
├── js/
│   ├── main.js         # Master cinematic orchestrator, resize handling, loop management
│   ├── ganesha.js      # Sacred geometry, anatomical cubic Bézier curves, 3D sculptural shading
│   ├── animation.js    # Precision timeline scheduling, math utilities, particle physics
│   ├── atmosphere.js   # Mandap arch, swaying toran, red hibiscus, diyas, kalash, rangoli, halo
│   └── audio.js        # Deva Shree Ganesha audio engine, dynamic ducking bus, Temple bells
├── assets/
│   └── audio/
│       └── deva_shree_ganesha.mp3   # Iconic "Deva Shree Ganesha" devotional song
└── README.md           # Documentation & design specifications
```

---

## 🔊 Sacred Devotional Audio System

### Authentic Music Selection
- **Exclusive Anthem**: *Deva Shree Ganesha* (Ajay-Atul)
- **Automatic Playback**: Starts automatically on page load or earliest passive gesture.
- **Controls**: Minimal subtle golden sound badge on top-right corner with mute toggle.

### Dynamic Audio Mixer Hierarchy
- **`MASTER`**: Dynamic range compression ceiling via `DynamicsCompressorNode` for studio clarity.
- **`MUSIC`**: Subtle devotional background volume (17% maximum ceiling, never loud or overpowering).
- **`BELLS`**: Celestial temple bell chimes at sacred visual milestones (eye reveals, mandap awakening).

### Dynamic Ducking
Music volume automatically softens during intimate emotional moments:
- Drawing & Emergence: **17%**
- Eyes Reveal: **11%** (reverent softening)
- Completed Ganesha Hold: **10%** (peaceful darshan)
- Message Reveal: **3.5%** (intimate background reverence)
- Personal Final Hold (*"For my Bangaram. ❤️"*): **1.2%** (near-silent reverence)

---

## 🎨 Visual Composition
- **Desktop/Widescreen**: Balanced two-column editorial composition. Ganesha and ceremonial Mandap occupy the left half (~51%), and Bangaram's spacious, high-readability message card occupies the second half (~46–49%).
- **Mobile/Portrait**: Reflows naturally into a vertical stacked layout with zero horizontal overflow.
- **Zero Build Tools Required**: Built on modern native ES Modules, Canvas 2D, and Web Audio API.
