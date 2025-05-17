import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/rest/v1': {
        target: 'https://pbsgsljpqrwrfeddazjx.supabase.co',
        changeOrigin: true,
        secure: false
      }
    }
  }
});