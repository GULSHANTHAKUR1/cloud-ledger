import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'

// ─── Context ─────────────────────────────────────────────────────────────────
const AuthContext = createContext(null)

// ─── Provider ────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)   // Firebase user object
  const [role, setRole]       = useState(null)   // 'super_admin' | 'admin' | 'staff' | 'client'
  const [profile, setProfile] = useState(null)   // Extra profile info from Firestore (name, phone, etc.)
  const [loading, setLoading] = useState(true)   // waiting for auth state

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (snap.exists()) {
            const data = snap.data()
            setUser(firebaseUser)
            setProfile(data)
            setRole(data.role || (firebaseUser.email === 'admin@cloudledger.in' ? 'super_admin' : 'client'))
          } else {
            // Document doesn't exist yet (e.g. freshly created or admin initial)
            setUser(firebaseUser)
            const fallbackRole = firebaseUser.email === 'admin@cloudledger.in' ? 'super_admin' : 'client'
            setRole(fallbackRole)
            setProfile({ email: firebaseUser.email, role: fallbackRole })
          }
        } catch (e) {
          console.warn('Firestore user fetch failed, applying fallback role', e)
          setUser(firebaseUser)
          const fallbackRole = firebaseUser.email === 'admin@cloudledger.in' ? 'super_admin' : 'client'
          setRole(fallbackRole)
          setProfile({ email: firebaseUser.email, role: fallbackRole })
        }
      } else {
        setUser(null)
        setRole(null)
        setProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  // ── Login ──
  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), password)
    let userRole = cred.user.email === 'admin@cloudledger.in' ? 'super_admin' : 'client'
    let userProfile = { email: cred.user.email, role: userRole }

    try {
      const snap = await getDoc(doc(db, 'users', cred.user.uid))
      if (snap.exists()) {
        const data = snap.data()
        if (data.role) userRole = data.role
        userProfile = data
      }
    } catch (e) {
      console.warn('Could not read user role from Firestore, using default:', userRole)
    }

    setUser(cred.user)
    setRole(userRole)
    setProfile(userProfile)
    return { user: cred.user, role: userRole, profile: userProfile }
  }

  // ── Register New Client ──
  const registerClient = async (name, email, phone, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password)
    const newProfile = {
      uid: cred.user.uid,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: 'client', // Strictly assigned as client
      createdAt: serverTimestamp(),
      status: 'active'
    }

    try {
      await setDoc(doc(db, 'users', cred.user.uid), newProfile)
    } catch (err) {
      console.warn('Could not write client profile to Firestore directly, caching in localStorage', err)
      localStorage.setItem(`user_profile_${cred.user.uid}`, JSON.stringify(newProfile))
    }

    setUser(cred.user)
    setRole('client')
    setProfile(newProfile)
    return { user: cred.user, role: 'client', profile: newProfile }
  }

  // ── Logout ──
  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, role, profile, loading, login, registerClient, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
