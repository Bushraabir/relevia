// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // compression only when we build for production
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      filter: /\.(js|css|html|svg)$/,
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      filter: /\.(js|css|html|svg)$/,
    }),
  ],

  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          webllm: ['@mlc-ai/web-llm'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});