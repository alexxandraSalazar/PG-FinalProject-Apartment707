import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: './', // Asegura que las rutas relativas funcionen en producción
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Evita dividir en múltiples chunks
      },
    },
  },
  server: {
    historyApiFallback: true, // Asegura que las rutas funcionen en desarrollo
  },
})
