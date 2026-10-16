import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Base relativa: el mismo build se sirve en toponimos-sudamerica.labtecnosocial.org/,
// en labtecnosocial.org/toponimos-sudamerica/ y en GitHub Pages (/sudamerica-toponimos/).
export default defineConfig({
  base: './',
  plugins: [react()],
})
