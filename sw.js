importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAKmgoXA4m3cRTmxJq4aUyva5SVvFbTNqg",
    authDomain: "eandccourier-36fcc.firebaseapp.com",
    databaseURL: "https://eandccourier-36fcc-default-rtdb.firebaseio.com",
    projectId: "eandccourier-36fcc",
    messagingSenderId: "931221081541"
});

const messaging = firebase.messaging();

// JOB 1: Handle Background Notifications (Your original Firebase code)
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Background message received ', payload);
    
    const notificationTitle = payload.notification ? payload.notification.title : "E&C Dispatch Alert";
    const notificationOptions = {
        body: payload.notification ? payload.notification.body : "New job details available.",
        icon: 'icon-512.png',
        badge: 'icon-512.png',
        vibrate: [200, 100, 200]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Click Handler: Opens the app when you tap the notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

// JOB 2: The PWA "Offline" Requirement
// This empty event listener is REQUIRED for the "Install App" button to show up.
self.addEventListener('fetch', (event) => {
  return;
});
