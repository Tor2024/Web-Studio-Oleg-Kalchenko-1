// vite.config.ts
import path from "node:path";
import { reactRouter } from "file:///home/ubuntu/repos/Web-Studio-Oleg-Kalchenko-1/apps/web/node_modules/@react-router/dev/dist/vite.js";
import { defineConfig } from "file:///home/ubuntu/repos/Web-Studio-Oleg-Kalchenko-1/apps/web/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///home/ubuntu/repos/Web-Studio-Oleg-Kalchenko-1/apps/web/node_modules/vite-tsconfig-paths/dist/index.js";
var __vite_injected_original_dirname = "/home/ubuntu/repos/Web-Studio-Oleg-Kalchenko-1/apps/web";
var vite_config_default = defineConfig({
  build: {
    target: "es2022"
  },
  optimizeDeps: {
    include: ["lucide-react"],
    exclude: ["fsevents", "lightningcss"]
  },
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      lodash: "lodash-es",
      "@": path.resolve(__vite_injected_original_dirname, "src")
    },
    dedupe: ["react", "react-dom"]
  },
  server: {
    host: "0.0.0.0",
    port: 4e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS91YnVudHUvcmVwb3MvV2ViLVN0dWRpby1PbGVnLUthbGNoZW5rby0xL2FwcHMvd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS91YnVudHUvcmVwb3MvV2ViLVN0dWRpby1PbGVnLUthbGNoZW5rby0xL2FwcHMvd2ViL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3VidW50dS9yZXBvcy9XZWItU3R1ZGlvLU9sZWctS2FsY2hlbmtvLTEvYXBwcy93ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgcmVhY3RSb3V0ZXIgfSBmcm9tICdAcmVhY3Qtcm91dGVyL2Rldi92aXRlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXMyMDIyJyxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogWydsdWNpZGUtcmVhY3QnXSxcbiAgICBleGNsdWRlOiBbJ2ZzZXZlbnRzJywgJ2xpZ2h0bmluZ2NzcyddLFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3RSb3V0ZXIoKSwgdHNjb25maWdQYXRocygpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBsb2Rhc2g6ICdsb2Rhc2gtZXMnLFxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgfSxcbiAgICBkZWR1cGU6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICBwb3J0OiA0MDAwLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVWLE9BQU8sVUFBVTtBQUN4VyxTQUFTLG1CQUFtQjtBQUM1QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1CQUFtQjtBQUgxQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGNBQWM7QUFBQSxJQUN4QixTQUFTLENBQUMsWUFBWSxjQUFjO0FBQUEsRUFDdEM7QUFBQSxFQUNBLFNBQVMsQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBQUEsRUFDeEMsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3BDO0FBQUEsSUFDQSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsRUFDL0I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
