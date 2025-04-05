import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Register service worker for offline capabilities and faster loading
// Define process.env for TypeScript
declare global {
  interface Window {
    env: {
      NODE_ENV: string;
    };
  }
}

// Use window.env or default to production
const isProduction = typeof window !== 'undefined' && 
  window.env?.NODE_ENV === 'production' || 
  import.meta.env.PROD;

if ('serviceWorker' in navigator && isProduction) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.error('ServiceWorker registration failed: ', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);