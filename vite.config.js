import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Destination-Log/', // Ensure this matches your repo name

  server: {
    host: '0.0.0.0', // Allow external access (important for Render)
    port: process.env.PORT || 3000, // Use Render's assigned port or default to 3000
  }
});
