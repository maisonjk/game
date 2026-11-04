import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base so the build works inside the Capacitor iOS shell and on any host.
  base: './',
  plugins: [react(), tailwindcss()],
  build: { target: 'es2020', outDir: 'dist' },
});
