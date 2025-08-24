// Nama cache unik untuk aplikasi admin.
const CACHE_NAME = 'admin-aps-cache-v1';

// Daftar lengkap file yang akan disimpan di cache.
const URLS_TO_CACHE = [
  '/',
  'index.html',
  
  // File dari dalam folder 'favicon'
  'favicon/site.webmanifest',
  'favicon/favicon.ico',
  'favicon/favicon.svg',
  'favicon/apple-touch-icon.png',
  'favicon/favicon-96x96.png',
  'favicon/web-app-manifest-192x192.png',
  'favicon/web-app-manifest-512x512.png',
  
  // File eksternal (CDN) yang digunakan
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js'
];

// Event 'install': Menyimpan file ke cache.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      console.log('Cache dibuka, menambahkan file inti aplikasi admin');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Event 'fetch': Menyajikan file dari cache jika offline.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Event 'activate': Membersihkan cache lama.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});