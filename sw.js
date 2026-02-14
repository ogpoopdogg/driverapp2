importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAKmgoXA4m3cRTmxJq4aUyva5SVvFbTNqg",
    authDomain: "eandccourier-36fcc.firebaseapp.com",
    databaseURL: "https://eandccourier-36fcc-default-rtdb.firebaseio.com",
    projectId: "eandccourier-36fcc",
    messagingSenderId: "931221081541"
    appId: "1:1067680083511:android:22d1eb3757302492bd19b2",
});

const messaging = firebase.messaging();

// Simplified Caching to prevent "Evaluation Failed" errors
const CACHE_NAME = 'ec-driver-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // we use 'addAll' but wrap it so one missing file doesn't crash the whole SW
            return Promise.allSettled(ASSETS.map(asset => cache.add(asset)));
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
