import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    target: 'es2022',
  },
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    port: 4000,
  },
});
