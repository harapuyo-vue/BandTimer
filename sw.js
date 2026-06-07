const CACHE_NAME = 'band-timer-v1';
// キャッシュするファイルのリスト（HTMLファイル名が違う場合は書き換えてください）
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// インストール時にファイルをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 実行時にキャッシュがあればそれを返す（オフライン対応）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // キャッシュがあれば返す、なければネットワークへ（GASへの通信はここで通る）
      return response || fetch(event.request);
    })
  );
});