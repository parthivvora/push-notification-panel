importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCBOi63AzUuPLHjgj7QjaaJvY7Xj5lRL4I",
  authDomain: "push-notification-mern.firebaseapp.com",
  projectId: "push-notification-mern",
  storageBucket: "push-notification-mern.firebasestorage.app",
  messagingSenderId: "979223826415",
  appId: "1:979223826415:web:1741007385d9b43af5301a",
  measurementId: "G-KCBM98JL7Z",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Message received in to background ", payload);
  // ...
});
