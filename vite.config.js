import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  
  build: {
    rollupOptions: {
      input: {
        entry: '/src/main.jsx'
      },
      output: {
       entryFileNames: '[name].js'
      }
    }
  },
  server: {
    hmr: false
  }
})
