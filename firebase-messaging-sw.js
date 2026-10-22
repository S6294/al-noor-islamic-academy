importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBvugRPCyDcq0gJsE_eUsaoVExi5Rc614k",
  authDomain: "al-noor-islamic-academy.firebaseapp.com",
  projectId: "al-noor-islamic-academy",
  storageBucket: "al-noor-islamic-academy.firebasestorage.app",
  messagingSenderId: "571799539455",
  appId: "1:571799539455:web:d42728685908430296c6ca"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Avoid showing a duplicate notification when
  // the payload already contains a notification.
  if (payload.notification) return;

  const title =
    payload.data?.title || "Al Noor Islamic Academy";

  const options = {
    body: payload.data?.message || "You have a new update.",
    icon: "/favicon.ico",
    data: {
      url: payload.data?.url || "/notifications.html"
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/notifications.html";

  event.waitUntil(
    clients.openWindow(new URL(url, self.location.origin).href)
  );
});
