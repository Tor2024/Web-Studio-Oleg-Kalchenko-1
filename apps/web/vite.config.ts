import path from 'node:path';
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    target: 'es2022',
  },
  optimizeDeps: {
    include: ['lucide-react'],
    exclude: ['fsevents', 'lightningcss'],
  },
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      lodash: 'lodash-es',
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    host: '0.0.0.0',
    port: 4000,
  },
});
