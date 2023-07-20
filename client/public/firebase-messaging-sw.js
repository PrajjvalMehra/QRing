// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

console.log("hi");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyA3uY7UcII_BVDoGoHlcRzYMeAQTtjkeI8",
    authDomain: "qring-5a533.firebaseapp.com",
    projectId: "qring-5a533",
    storageBucket: "qring-5a533.appspot.com",
    messagingSenderId: "261913302441",
    appId: "1:261913302441:web:fcd5eb221e2176687c20b8",
    measurementId: "G-6SYTLF7SH2",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
