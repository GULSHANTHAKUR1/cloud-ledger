import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'

const WA_NUMBER = '917827225372'

export default function LoginPage() {
  const [activeTab, setActiveTab]   = useState('login') // 'login' | 'register' | 'whatsapp'
  const [loginForm, setLoginForm]   = useState({ email: '', password: '' })
  const [regForm, setRegForm]       = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [waPhone, setWaPhone]       = useState('')
  const [waReason, setWaReason]     = useState('onboarding')
  const [loading, setLoading]       = useState(false)
  const [showPass, setShowPass]     = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(true)

  const { login, registerClient } = useAuth()
  const navigate = useNavigate()

  const handleLoginChange = e => setLoginForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleRegChange   = e => setRegForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  // Google Social Sign-In
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      toast.success(`Welcome, ${result.user.displayName || result.user.email}!`)
      navigate('/dashboard/client')
    } catch (err) {
      console.warn('Google Auth notice:', err)
      if (err.code !== 'auth/popup-closed-by-user') {
        toast.error('Google Sign-In: ' + (err.message || 'Please use email login.'))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSocialNotice = (provider) => {
    toast(`Continue with ${provider} is initializing. You can also sign in with email.`, { icon: '🔐' })
  }

  // Unified Smart Login: Automatically routes by role from database
  const handleLogin = async (e) => {
    e.preventDefault()
    if (!loginForm.email || !loginForm.password) {
      toast.error('Please enter your email and password.')
      return
    }
    if (!termsAgreed) {
      toast.error('Please agree to the Terms of Use & Privacy Policy.')
      return
    }
    setLoading(true)

    try {
      const { role } = await login(loginForm.email.trim(), loginForm.password)
      
      if (role === 'client') {
        toast.success('Welcome back! Redirecting to your Client Vault...')
        navigate('/dashboard/client')
      } else if (role === 'staff') {
        toast.success('Welcome! Redirecting to Staff Tasks Dashboard...')
        navigate('/dashboard/staff')
      } else if (role === 'super_admin' || role === 'admin') {
        toast.success('Welcome Administrator! Redirecting to Operations Dashboard...')
        navigate('/dashboard/admin')
      } else {
        navigate('/dashboard/client')
      }
    } catch (err) {
      console.error(err)
      const code = err.code
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        toast.error('Incorrect email or password. Please verify your credentials.')
      } else if (code === 'auth/too-many-requests') {
        toast.error('Account temporarily locked. Please use WhatsApp assistance below.')
      } else {
        toast.error('Login failed: ' + (err.message || 'Please verify credentials.'))
      }
    } finally {
      setLoading(false)
    }
  }

  // First-Time Client Registration
  const handleRegister = async (e) => {
    e.preventDefault()
    if (!regForm.name || !regForm.email || !regForm.phone || !regForm.password) {
      toast.error('Please fill in all registration fields.')
      return
    }
    if (regForm.password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }
    if (regForm.password !== regForm.confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }
    if (!termsAgreed) {
      toast.error('Please agree to the Terms of Use & Privacy Policy.')
      return
    }

    setLoading(true)
    try {
      await registerClient(regForm.name, regForm.email, regForm.phone, regForm.password)
      toast.success('Account created successfully! Welcome to your Document Vault.')
      navigate('/dashboard/client')
    } catch (err) {
      console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please sign in instead.')
        setActiveTab('login')
        setLoginForm(p => ({ ...p, email: regForm.email }))
      } else {
        toast.error('Registration failed: ' + (err.message || 'Please try again.'))
      }
    } finally {
      setLoading(false)
    }
  }

  // Password Reset Link
  const handleForgotPass = async () => {
    if (!loginForm.email) {
      toast.error('Please enter your email address in the box first.')
      return
    }
    try {
      await sendPasswordResetEmail(auth, loginForm.email.trim())
      toast.success('Password reset link sent to your email!')
    } catch (err) {
      toast.error('Could not send reset email. Contact support on WhatsApp.')
    }
  }

  // WhatsApp Support Request
  const handleWhatsAppSupport = (e) => {
    e.preventDefault()
    if (!waPhone) {
      toast.error('Please enter your registered mobile number.')
      return
    }

    let reasonText = 'I am a first-time client and need portal access assistance.'
    if (waReason === 'reset') reasonText = 'I forgot my password. Please help me reset my account access.'
    if (waReason === 'credentials') reasonText = 'I need my login credentials for the portal.'

    const msg = encodeURIComponent(
      `Hello Cloud Ledger Support Desk!\n\n` +
      `🔐 Portal Login Assistance:\n` +
      `📱 Registered Mobile: ${waPhone}\n` +
      `❓ Request: ${reasonText}\n\n` +
      `Please provide access assistance.`
    )

    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank')
    toast.success('Opening WhatsApp Support Desk!')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 25%, rgba(30, 96, 255, 0.12) 0%, #050608 65%, #000000 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2.5rem 1.5rem', fontFamily: "'Inter', sans-serif"
    }}>
      {/* ── Exact Modal Card matching Image 8 ── */}
      <div style={{
        width: '100%', maxWidth: 440,
        background: '#121316',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 24,
        padding: '2.4rem 2rem',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
        position: 'relative'
      }}>
        {/* Close Button top-right */}
        <Link
          to="/"
          style={{
            position: 'absolute', top: 20, right: 22,
            color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none',
            fontSize: '1.25rem', transition: 'color 0.2s', cursor: 'pointer',
            lineHeight: 1
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
        >
          ✕
        </Link>

        {/* Modal Header */}
        <h2 style={{
          color: '#ffffff',
          fontSize: '1.65rem',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '1.8rem',
          letterSpacing: '-0.3px'
        }}>
          {activeTab === 'register' ? 'Create your account' : activeTab === 'whatsapp' ? 'Support & Access' : 'Log in or sign up'}
        </h2>

        {/* Social Buttons (Image 8) */}
        {activeTab !== 'whatsapp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1.5rem' }}>
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              style={{
                width: '100%', height: 48,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 12, color: '#ffffff',
                fontWeight: 600, fontSize: '0.92rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'}
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              Continue with Google
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={() => handleSocialNotice('Apple')}
              style={{
                width: '100%', height: 48,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 12, color: '#ffffff',
                fontWeight: 600, fontSize: '0.92rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'}
            >
              <i className="fab fa-apple" style={{ fontSize: '1.25rem' }} />
              Continue with Apple
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={() => handleSocialNotice('Facebook')}
              style={{
                width: '100%', height: 48,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 12, color: '#ffffff',
                fontWeight: 600, fontSize: '0.92rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'}
            >
              <i className="fab fa-facebook" style={{ color: '#1877f2', fontSize: '1.25rem' }} />
              Continue with Facebook
            </button>
          </div>
        )}

        {/* OR Divider (Image 8) */}
        {activeTab !== 'whatsapp' && (
          <div style={{ display: 'flex', alignItems: 'center', margin: '1.6rem 0', gap: 14 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255, 255, 255, 0.1)' }} />
            <span style={{ color: '#71717a', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255, 255, 255, 0.1)' }} />
          </div>
        )}

        {/* ════ TAB 1: SIGN IN ════ */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin}>
            {/* Email Field with Glowing Blue Border on focus */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500, marginBottom: 7 }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <i className="far fa-envelope" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '0.95rem' }} />
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: '100%', height: 48, padding: '0 16px 0 46px',
                    background: '#090a0d', border: '1.5px solid #2563eb',
                    borderRadius: 12, color: 'white', fontSize: '0.92rem', outline: 'none',
                    boxShadow: '0 0 15px rgba(37, 99, 235, 0.2)', transition: 'border-color 0.2s'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '1.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500 }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPass}
                  style={{ background: 'none', border: 'none', color: '#1e60ff', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 500 }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-lock" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '0.9rem' }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%', height: 48, padding: '0 46px 0 46px',
                    background: '#090a0d', border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: 12, color: 'white', fontSize: '0.92rem', outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.14)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>

            {/* Big White Continue Button (Image 8) */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: 48,
                background: '#ffffff', color: '#000000',
                borderRadius: 9999, border: 'none',
                fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1, transition: 'all 0.2s',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.25)'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
            >
              {loading ? <i className="fas fa-spinner fa-spin" /> : 'Continue'}
            </button>

            {/* Terms of Use Checkbox (Image 8) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: '1.2rem' }}>
              <input
                type="checkbox"
                id="login-terms"
                checked={termsAgreed}
                onChange={e => setTermsAgreed(e.target.checked)}
                style={{ accentColor: '#ffffff', width: 15, height: 15, cursor: 'pointer' }}
              />
              <label htmlFor="login-terms" style={{ color: '#94a3b8', fontSize: '0.78rem', cursor: 'pointer' }}>
                I agree to the <span style={{ color: '#ffffff', textDecoration: 'underline' }}>Terms of Use</span> & <span style={{ color: '#ffffff', textDecoration: 'underline' }}>Privacy Policy</span>
              </label>
            </div>

            {/* Links for New Users / WhatsApp */}
            <div style={{ marginTop: '1.8rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <span style={{ color: '#71717a' }}>First time visiting?</span>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Sign up here →
              </button>
            </div>
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <button
                type="button"
                onClick={() => setActiveTab('whatsapp')}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.76rem', cursor: 'pointer' }}
              >
                Need assistance? Open WhatsApp Help
              </button>
            </div>
          </form>
        )}

        {/* ════ TAB 2: SIGN UP / REGISTRATION ════ */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500, marginBottom: 5 }}>
                Full Name / Business Name
              </label>
              <input
                type="text"
                name="name"
                value={regForm.name}
                onChange={handleRegChange}
                placeholder="Rahul Sharma / ABC Traders"
                required
                style={{
                  width: '100%', height: 46, padding: '0 14px',
                  background: '#090a0d', border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: 12, color: 'white', fontSize: '0.9rem', outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500, marginBottom: 5 }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={regForm.email}
                onChange={handleRegChange}
                placeholder="name@example.com"
                required
                style={{
                  width: '100%', height: 46, padding: '0 14px',
                  background: '#090a0d', border: '1.5px solid #2563eb',
                  borderRadius: 12, color: 'white', fontSize: '0.9rem', outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500, marginBottom: 5 }}>
                WhatsApp / Mobile Number
              </label>
              <input
                type="tel"
                name="phone"
                value={regForm.phone}
                onChange={handleRegChange}
                placeholder="10-digit mobile number"
                required
                style={{
                  width: '100%', height: 46, padding: '0 14px',
                  background: '#090a0d', border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: 12, color: 'white', fontSize: '0.9rem', outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500, marginBottom: 5 }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={regForm.password}
                  onChange={handleRegChange}
                  placeholder="Min 6 chars"
                  required
                  style={{
                    width: '100%', height: 46, padding: '0 12px',
                    background: '#090a0d', border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: 12, color: 'white', fontSize: '0.88rem', outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500, marginBottom: 5 }}>
                  Confirm
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={regForm.confirmPassword}
                  onChange={handleRegChange}
                  placeholder="Re-enter"
                  required
                  style={{
                    width: '100%', height: 46, padding: '0 12px',
                    background: '#090a0d', border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: 12, color: 'white', fontSize: '0.88rem', outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* White Continue Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: 48,
                background: '#ffffff', color: '#000000',
                borderRadius: 9999, border: 'none',
                fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1, transition: 'all 0.2s',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.25)'
              }}
            >
              {loading ? <i className="fas fa-spinner fa-spin" /> : 'Create Account'}
            </button>

            {/* Terms */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: '1.2rem' }}>
              <input
                type="checkbox"
                id="reg-terms"
                checked={termsAgreed}
                onChange={e => setTermsAgreed(e.target.checked)}
                style={{ accentColor: '#ffffff', width: 15, height: 15, cursor: 'pointer' }}
              />
              <label htmlFor="reg-terms" style={{ color: '#94a3b8', fontSize: '0.78rem', cursor: 'pointer' }}>
                I agree to the <span style={{ color: '#ffffff', textDecoration: 'underline' }}>Terms of Use</span> & <span style={{ color: '#ffffff', textDecoration: 'underline' }}>Privacy Policy</span>
              </label>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.4rem', fontSize: '0.8rem', color: '#71717a' }}>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 600, cursor: 'pointer' }}
              >
                Log in here
              </button>
            </div>
          </form>
        )}

        {/* ════ TAB 3: WHATSAPP ACCESS ASSISTANCE ════ */}
        {activeTab === 'whatsapp' && (
          <form onSubmit={handleWhatsAppSupport}>
            <div style={{
              padding: '14px', borderRadius: 14, marginBottom: '1.4rem',
              background: 'rgba(37, 212, 102, 0.08)', border: '1px solid rgba(37, 212, 102, 0.25)',
              color: '#34d399', fontSize: '0.82rem', lineHeight: 1.6
            }}>
              <i className="fab fa-whatsapp" style={{ marginRight: 8, fontSize: '1rem' }} />
              Direct support for password resets, first-time credentials, and dashboard onboarding.
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500, marginBottom: 7 }}>
                Registered Mobile Number
              </label>
              <input
                type="tel"
                value={waPhone}
                onChange={e => setWaPhone(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                required
                style={{
                  width: '100%', height: 48, padding: '0 16px',
                  background: '#090a0d', border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: 12, color: 'white', fontSize: '0.92rem', outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500, marginBottom: 7 }}>
                Assistance Required
              </label>
              <select
                value={waReason}
                onChange={e => setWaReason(e.target.value)}
                style={{
                  width: '100%', height: 48, padding: '0 16px',
                  background: '#090a0d', border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: 12, color: 'white', fontSize: '0.88rem', outline: 'none'
                }}
              >
                <option value="onboarding" style={{ background: '#121316', color: 'white' }}>First-time portal access</option>
                <option value="reset" style={{ background: '#121316', color: 'white' }}>Password reset help</option>
                <option value="credentials" style={{ background: '#121316', color: 'white' }}>Retrieve login credentials</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                width: '100%', height: 48,
                background: '#25d466', color: '#ffffff',
                borderRadius: 9999, border: 'none',
                fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 18px rgba(37, 212, 102, 0.3)'
              }}
            >
              <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Open WhatsApp Support
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.4rem' }}>
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                ← Back to standard login
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  )
}
