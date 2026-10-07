import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // GitHub Pages liefert die Seite unter /MyFirstwebsite/ aus
  base: command === 'build' || isPreview ? '/MyFirstwebsite/' : '/',
}))
