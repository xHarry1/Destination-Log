import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',  // Ensures proper routing
  
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000, 
  }
});
