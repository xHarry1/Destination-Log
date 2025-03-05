import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Destination-Log/', // Ensure this matches your repo name

  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    allowedHosts: ['destination-log.onrender.com'], // Allow Render frontend host
  }
});
