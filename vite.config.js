import react from '@vitejs/plugin-react'
import { JSDOM } from 'jsdom'
import { defineConfig } from 'vite'
import { test } from 'vitest'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true, // Nos permite usar describe, it y expect sin importarlos en cada archivo
    environment: 'jsdom', // Usa el navegador invisible que instalamos
    setupFiles: './src/setupTest.js', // Archivo de configuración inicial
  }
  
}


)

