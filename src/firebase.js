import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCBOi63AzUuPLHjgj7QjaaJvY7Xj5lRL4I",
  authDomain: "push-notification-mern.firebaseapp.com",
  projectId: "push-notification-mern",
  storageBucket: "push-notification-mern.firebasestorage.app",
  messagingSenderId: "979223826415",
  appId: "1:979223826415:web:1741007385d9b43af5301a",
  measurementId: "G-KCBM98JL7Z",
};

const firebaseApp = initializeApp(firebaseConfig);

const vapidKey =
  "BBQcg8zSuRRs3F1lepmccRT0D5b1YVv2v9MocFvmMb2Df16qoQEKcQQBznksQYddeJMPo_VjP2-HI6y8AkJMK-0";
const messaging = getMessaging(firebaseApp);

export const requestFCMToken = async () => {
  return Notification.requestPermission()
    .then(async (permission) => {
      if (permission === "granted") {
        const token = await getToken(messaging, { vapidKey: vapidKey });
        await fetch("https://push-notification-backend-umber.vercel.app/save-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fcmToken: token }),
        });
        return token;
      } else {
        throw new Error("Permission denied for notifications");
      }
    })
    .catch((error) => {
      console.error("Error getting FCM token:", error);
      throw error;
    });
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("🚀 ~ messaging.onMessage ~ payload:", payload);
      resolve(payload);
    });
  });
};
