import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Assets live in the pre-existing capital-P `Public/` folder from the original
// single-file deck, so point Vite's publicDir at it rather than duplicating.
export default defineConfig({
  base: './',
  plugins: [react()],
  publicDir: 'Public',
})
