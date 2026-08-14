import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// `base` must match your GitHub repo name so assets resolve correctly on
// GitHub Pages (e.g. https://<user>.github.io/<repo-name>/).
// The deploy workflow sets VITE_BASE_PATH automatically from the repo name,
// so you normally don't need to touch this. For local builds that mimic
// production, set VITE_BASE_PATH yourself (see README).
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
