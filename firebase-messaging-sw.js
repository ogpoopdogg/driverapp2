importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Must match your index.html config exactly
firebase.initializeApp({
    apiKey: "AIzaSyAKmgoXA4m3cRTmxJq4aUyva5SVvFbTNqg",
    authDomain: "eandccourier-36fcc.firebaseapp.com",
    databaseURL: "https://eandccourier-36fcc-default-rtdb.firebaseio.com",
    projectId: "eandccourier-36fcc",
    messagingSenderId: "931221081541"
});

const messaging = firebase.messaging();

// This handles the notification when the browser tab is CLOSED
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Background message received ', payload);
    
    // If the payload has no notification payload, we construct one from data
    const notificationTitle = payload.notification ? payload.notification.title : "E&C Dispatch Alert";
    const notificationOptions = {
        body: payload.notification ? payload.notification.body : "New job details available.",
        icon: 'icon-512.png',
        badge: 'icon-512.png', // Small icon for phone status bar
        vibrate: [200, 100, 200]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// This makes the notification clickable to open your app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/') // Opens your homepage
    );
});
