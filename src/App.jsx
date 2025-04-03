import { useEffect, useState } from "react";
import { onMessageListener, requestFCMToken } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await requestFCMToken();
        console.log("FCM Token:", token);
        setFcmToken(token);
      } catch (error) {
        console.error("FCM Token Error:", error);
      }
    };

    fetchToken();

  }, []);
  // Listen for Notifications
  onMessageListener()
    .then((payload) => {
      console.log("Notification Payload:", payload);

      // Display Notification with Toast
      toast.info(
        <div>
          <strong>{payload.notification.title}</strong>
          <p>{payload.notification.body}</p>
        </div>,
        {
          icon: payload.notification.image || "/avatar.png",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    })
    .catch((error) => console.error("Notification Error:", error));

  return (
    <>
      <ToastContainer />
      <h1>FCM Token: {fcmToken || "Fetching..."}</h1>
    </>
  );
}

export default App;
