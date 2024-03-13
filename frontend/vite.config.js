import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'https://backend3-j9x6.onrender.com',
    },
  },
  plugins: [react()],
})
