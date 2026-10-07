import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative Pfade: funktioniert auf GitHub Pages unabhängig vom Repo-Namen
  base: './',
})
