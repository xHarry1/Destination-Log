import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode (production or development)
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react(), tailwindcss()],
    base: '/',
    server: {
      host: '0.0.0.0',
      port: process.env.PORT || 3000, 
    }
  };
});
