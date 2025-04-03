import { useEffect, useState } from 'react'
import { onMessageListener, requestFCMToken } from './firebase'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [fcmToken, setFcmToken] = useState(null)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await requestFCMToken();
        console.log("🚀 ~ fetchToken ~ token:", token)
        setFcmToken(token)
      } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error)

      }
    }
    fetchToken();
  }, [])
  
  onMessageListener().then((payload) => {
    console.log("🚀 ~ onMessageListener ~ payload:", payload)
    toast(
      <div>
        <strong> {payload?.notification?.title} </strong>
        <p> {payload?.notification?.body} </p>
      </div>
    );
  }).catch((error) => {
    console.log("🚀 ~ onMessageListener ~ error:", error)
  });

  return (
    <>
     <ToastContainer />
      <h1>Token : {fcmToken && fcmToken}</h1>
    </>
  )
}

export default App
