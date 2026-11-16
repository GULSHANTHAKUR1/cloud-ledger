import React, { useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './theme.css'
import './index.css'
import { AuthProvider, useAuth } from './context/AuthContext'

// Public components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import About from './components/About'
import Resources from './components/Resources'
import Industries from './components/Industries'
import Knowledge from './components/Knowledge'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import EnquiryPopup from './components/EnquiryPopup'
import Calculators from './components/Calculators'

// Auth & Dashboard pages (lazy loaded to make initial homepage load blazing fast)
const LoginPage = lazy(() => import('./pages/LoginPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'))
const StaffDashboard = lazy(() => import('./pages/dashboard/StaffDashboard'))
const ClientDashboard = lazy(() => import('./pages/dashboard/ClientDashboard'))

const LoadingFallback = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 36, height: 36, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#1e60ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
      <div style={{ color: '#94a3b8', fontSize: '0.84rem' }}>Loading...</div>
    </div>
  </div>
)

// ── Public site layout ────────────────────────────────────────────────────────
function PublicLayout() {
  const [chosenService, setChosenService] = useState('')

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Services onSelectService={(srv) => setChosenService(srv)} />
      <Calculators />
      <About />
      <Resources />
      <Industries />
      <Knowledge />
      <Contact initialService={chosenService} />
      <Footer />
      <WhatsAppFloat />
      <EnquiryPopup />
    </>
  )
}

// ── Protected route ───────────────────────────────────────────────────────────
function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth()

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A1F44' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☁️</div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Loading...</div>
      </div>
    </div>
  )

  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/login" replace />

  return children
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { fontFamily: 'Inter, sans-serif', fontSize: '0.88rem' }
          }}
        />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Website */}
            <Route path="/" element={<PublicLayout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/enquiries" element={<AdminDashboard />} />

            {/* Admin Dashboard (Super Admin & Admin) */}
            <Route path="/dashboard/admin" element={
              <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Staff Dashboard */}
            <Route path="/dashboard/staff" element={
              <ProtectedRoute allowedRoles={['super_admin', 'admin', 'staff']}>
                <StaffDashboard />
              </ProtectedRoute>
            } />

            {/* Client Portal */}
            <Route path="/dashboard/client" element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientDashboard />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  )
}
