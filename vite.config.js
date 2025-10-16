import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE || '/w-day/',
  plugins: [vue()],
})
