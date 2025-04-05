// Service Worker for Northern Spark Photography
const CACHE_NAME = 'northern-spark-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/App.css',
  '/src/main.tsx',
  '/assets/vendor.js',
  '/assets/react-vendor.js'
];

// Cloudinary image domain for runtime caching
const CLOUDINARY_DOMAIN = 'res.cloudinary.com';

// Install event - cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            // If this cache name isn't in the allowlist, delete it
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Runtime caching strategy for Cloudinary images (stale-while-revalidate)
  if (url.hostname === CLOUDINARY_DOMAIN) {
    event.respondWith(
      caches.open(`${CACHE_NAME}-images`).then(cache => {
        return cache.match(event.request).then(response => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Save the new response in cache for future use
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            .catch(error => {
              console.error('Fetch failed for image:', error);
            });
            
          // Return the cached response if we have it, otherwise wait for network
          return response || fetchPromise;
        });
      })
    );
    return;
  }
  
  // Network-first strategy for HTML documents to get fresh content
  if (event.request.mode === 'navigate' || 
      (event.request.method === 'GET' && 
       event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If network fetch fails, fallback to cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the response from the cache
        if (response) {
          return response;
        }
        
        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a one-time use stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        });
      })
  );
});

// Listen for push notifications (for future enhancement)
self.addEventListener('push', event => {
  const title = 'Northern Spark Photography';
  const options = {
    body: event.data ? event.data.text() : 'New photos available!',
    icon: '/icon.png',
    badge: '/badge.png'
  };
  
  event.waitUntil(self.registration.showNotification(title, options));
});