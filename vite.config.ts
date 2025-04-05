import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    compression({
      include: [/\.(js|css|html|svg|json)$/],
      threshold: 1024, // Only compress files larger than 1KB
      algorithm: 'gzip',
      deleteOriginalAssets: false // Keep original files for browsers that don't support compression
    }),
    compression({
      include: [/\.(js|css|html|svg|json)$/],
      threshold: 1024,
      algorithm: 'brotliCompress',
      deleteOriginalAssets: false
    })
  ],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    // Only generate source maps in development mode
    sourcemap: process.env.NODE_ENV === 'development',
    // Target newer browsers for smaller bundles
    target: 'esnext',
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for major dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor'
            if (id.includes('react-dom')) return 'react-dom-vendor'
            if (id.includes('cloudinary')) return 'cloudinary-vendor'
            if (id.includes('masonry')) return 'masonry-vendor'
            return 'vendor' // All other dependencies
          }
        },
        // Ensure chunk size is optimal
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: process.env.NODE_ENV === 'production',
        // Remove debugger statements in production
        drop_debugger: process.env.NODE_ENV === 'production',
      }
    },
    // Ensure CSS is optimized
    cssCodeSplit: true,
    // Reduce build size by removing license comments
    outDir: 'dist',
  },
  // Properly handle images
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.webp', '**/*.avif', '**/*.svg'],
  // Optimize CSS
  css: {
    devSourcemap: true, // Enable source maps for CSS in development
    postcss: {
      plugins: [
        // Processed through postcss.config.js
      ],
    },
  },
  // Define environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  
  // Optimize preview server
  preview: {
    port: 4173,
    host: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
})