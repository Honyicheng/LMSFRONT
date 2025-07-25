import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src'),
      '@': '/src', // This allows you to use '@' as an alias for the 'src' directory
    },
  }
  //  server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080', // Spring Boot 后端地址
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
