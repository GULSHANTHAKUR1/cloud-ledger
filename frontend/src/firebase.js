import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC1zSnVq7s1WzwxAhmY_6Kjh-Ag3V4nt3c",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cloud-ledger-832a4.firebaseapp.com",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID || "cloud-ledger-832a4",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cloud-ledger-832a4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "340145833955",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID || "1:340145833955:web:b141a1b58ac2f6e031c2d6",
}

const app = initializeApp(firebaseConfig)

export const auth    = getAuth(app)
export const db      = getFirestore(app)
export const storage = getStorage(app)

export default app
