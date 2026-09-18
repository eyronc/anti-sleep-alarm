# Anti-Sleep Alarm

An interactive presentation deck, hardware blueprint, and drowsiness simulator built with React, TypeScript, and Vite.

## Features

- **11-Slide Editorial Deck**: Covers project problem statement, 4-step pipeline, hardware blueprint, EAR algorithm math, 5-stage escalation state machine, Python/C++ code samples, and key takeaways.
- **Interactive Drowsiness Simulator**: Real-time lab simulator with Web Audio API synthesis (polite warning chime, 85dB piercing alarm, and realistic physical slap impact audio), animated SVG student avatar with droop/shock recoil, desk-mounted SG90 slap mallet, and cool water mist actuator.
- **Hardware Taxonomy & 3D Mapping**: Interactive board anatomy mapping with category filters and hoverable sensor/actuator markers.
- **PowerPoint PPTX Export**: Client-side `.pptx` generation with one-click export.
- **Theme Switching & Fullscreen**: Minimalist Canva light theme and obsidian dark mode with keyboard shortcuts (`F`, `T`, `P`, arrows).

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS (Fluid clamp typography, glassmorphism, responsive single-viewport stage)
- **Audio Engine**: Web Audio API (Synthesizers & white-noise impact buffers)
- **Export**: PptxGenJS

## Getting Started

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```
