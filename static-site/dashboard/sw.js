// Stiemfield dashboard service worker — installable PWA + offline shell.
const C = 'stiem-dash-v1';
const SHELL = ['/dashboard/', '/dashboard/index.html', '/favicon.png'];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).catch(() => {}));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Live data: always network-first, fall back to last cached copy offline.
  if (url.pathname.endsWith('status.json')) {
    e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request)));
    return;
  }
  // Shell: cache-first for instant loads.
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
