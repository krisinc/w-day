import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { loadEnv } from 'vite'

// https://vite.dev/config/
// export default defineConfig({
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    base: process.env.VITE_BASE_URL || '/w-day/',
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [vue()],

    // css
    css: {
      // 指定傳遞給 css 前處理器的選項
      preprocessorOptions: {
        scss: {
          // 編譯 variable, minix 等
          additionalData: `@use "@/styles/_mixin.scss" as scssMixin;`,
        },
      },
    },
  })
}