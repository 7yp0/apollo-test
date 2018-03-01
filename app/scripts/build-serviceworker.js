/* eslint-disable */
import fs from 'fs';
import packageJson from '../package.json';

const swPath = './dist/sw.js';

const offlineHtml = '/views/offline.html';
const cacheFiles = [
  offlineHtml,
  'manifest.webmanifest',
  '/main.js',
];

const bundleLength = 3;

for (let i = 0; i < bundleLength; i++) {
  cacheFiles.push(`${i}.bundle.js`);
}

const jsRegEx = new RegExp('.*\.js');

const { version } = packageJson;

const sw = `
importScripts('/vendor/cache-polyfill.js');

var CACHE_NAME_PREFIX = 'app-cache-v';
var CACHE_NAME = CACHE_NAME_PREFIX + '${version}';

// pages
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(['${cacheFiles.join("', '")}']);
    })
  );
});

// fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function() {
      if (event.request.url.match(${jsRegEx})) {
        return caches.match('${offlineHtml}');
      }
    })
  );
});

// delete cache if new service worker activated
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return (CACHE_NAME !== cacheName && cacheName.includes(CACHE_NAME_PREFIX));
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

`;

fs.writeFile(swPath, sw, err => {
  if (err) throw err;

  // eslint-disable-next-line no-console
  console.log('New ServiceWorker saved!');
});
