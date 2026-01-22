
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // If deploying to https://<USERNAME>.github.io/<REPO>/, change base to '/<REPO>/'
  // For root domains, use '/'
  base: './', 
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    target: 'esnext'
  }
});
