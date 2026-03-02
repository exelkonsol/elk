
# $ELK - The Burden We Carry Together

Official website source for the $ELK project.

![ELK preview](./images/newpreview.png)

## About

This repository contains the ELK landing experience and ecosystem interface, including:

- Hero section and narrative branding
- Live chart links and ecosystem links
- Mechanism cards with philosophy modals
- Audio player and mini-player with ELK soundscape tracks
- Quote generation section
- Light and dark theme support

## Tech Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Supabase (optional realtime vote sync)

## Local Development

```bash
npm install
npm run dev
```

The app starts on the local Vite server (usually `http://localhost:5173`).

## Production Build

```bash
npm run build
```

Build output is generated in `dist/`.

## Notes

- The site base path is configured for GitHub Pages deployment at `/elk/` in `vite.config.ts`.
- Images and audio used by the player are stored in this repository under `images/` and `music/`.
  
