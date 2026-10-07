# Flavio Zaccardi — Portfolio

Persönliche Portfolio-Website, gebaut mit React, Vite, SCSS, Framer Motion und Lenis.

## Effekte

- Preloader mit Zähler und Curtain-Reveal
- Interaktives Punkt-Raster im Hero (Canvas), das dem Cursor ausweicht
- Buchstabenweise Titel-Animation und Scramble-Text für die Rollen
- Custom Cursor mit Labels und magnetische Buttons
- Smooth Scrolling (Lenis) und Scroll-Fortschrittsbalken
- Laufband, das auf Scroll-Geschwindigkeit reagiert
- Wort-für-Wort-Reveal im "Über mich"-Text, animierte Zähler
- Bento-Grid mit 3D-Tilt und Spotlight-Rand
- Horizontaler Scroll-Bereich für "Ausgewählte Arbeit"
- Respektiert `prefers-reduced-motion`

## Starten

```bash
npm install
npm run dev
```

## Struktur

- `src/components/` – eine Datei pro Sektion bzw. Effekt
- `src/hooks/` – Smooth Scroll und Media Queries
- `src/styles/` – Variablen, Basis-Styles und Sektionen
