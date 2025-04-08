import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: ['devserver-feature-cloudinary-sdk-upgrade--northernsparkphoto.netlify.app'],
  },
  build: {
    // Generate source maps for better debugging
    sourcemap: true,
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          // Add any other libraries that should be chunked separately
        },
      },
    },
  },
  // Properly handle images
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.webp', '**/*.avif', '**/*.svg'],
})
