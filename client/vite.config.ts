import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://test-deploy-ivka.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/auth': {
        target: 'https://test-deploy-ivka.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },

  },
});