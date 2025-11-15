import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig(({ mode }) => {
    return {
      // GitHub Pages deployment base path
      // Update 'opposed-roll-calculator' to match your repo name
      base: mode === 'production' ? '/opposed-roll-calculator/' : '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      css: {
        postcss: {
          plugins: [tailwindcss],
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
