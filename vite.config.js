import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Client port
    proxy: {
      '/pizzas': {
        target: 'http://localhost:5100', // Mock server port
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the target:', req.method, req.url);
          });
          proxy.on('proxyReq', (proxyRes, req, _res) => {
            console.log('Received Response from the target:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  }
})
