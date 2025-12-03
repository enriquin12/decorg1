const CACHE_NAME = 'minha-carteira-v5';
const URLS_TO_CACHE = [
  '/decorg1/',          // página inicial (ajuste conforme seu repositório)
  '/decorg1/index.html',
  '/decorg1/pagina2.html',
  '/decorg1/pagina3.html',
  '/decorg1/manifest.json',
  '/decorg1/icons/icon-192.png',
  '/decorg1/icons/icon-512.png',
  '/decorg1/pagina1.jpeg',
  '/decorg1/pagina2.jpeg',
  '/decorg1/pagina3.jpeg'
];

// Instala e guarda arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Intercepta requisições e responde com cache ou rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Atualiza cache quando versão muda
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
