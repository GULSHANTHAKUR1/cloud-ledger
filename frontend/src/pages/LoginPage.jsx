import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { sendPasswordResetEmail } from 'firebase/auth'
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

  const { login, registerClient } = useAuth()
  const navigate = useNavigate()

  const handleLoginChange = e => setLoginForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleRegChange   = e => setRegForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  // Unified Smart Login: Automatically routes by role from database
  const handleLogin = async (e) => {
    e.preventDefault()
    if (!loginForm.email || !loginForm.password) {
      toast.error('Please enter your email and password.')
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

  // First-Time Client Registration: Instant Client Vault Provisioning
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
      background: 'radial-gradient(circle at 10% 10%, #060f22 0%, #0A1F44 60%, #060d1d 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1.5rem', fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: 460 }}>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 44, height: 44, background: 'linear-gradient(135deg, #1DB954, #17a248)',
              borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, boxShadow: '0 4px 20px rgba(29,185,84,0.4)'
            }}>☁️</div>
            <span style={{ color: 'white', fontSize: '1.6rem', fontWeight: 800 }}>
              Cloud<span style={{ color: '#1DB954' }}>Ledger</span>
            </span>
          </Link>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 8 }}>
            Enterprise Compliance & Private Document Vault
          </div>
        </div>

        {/* Portal Access Mode Tabs */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          background: 'rgba(255,255,255,0.06)', borderRadius: 12,
          padding: 4, marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <button
            onClick={() => setActiveTab('login')}
            style={{
              padding: '10px 4px', border: 'none', borderRadius: 9, cursor: 'pointer',
              fontWeight: 700, fontSize: '0.78rem', transition: 'all 0.2s',
              background: activeTab === 'login' ? '#1DB954' : 'transparent',
              color: activeTab === 'login' ? 'white' : 'rgba(255,255,255,0.6)',
              boxShadow: activeTab === 'login' ? '0 2px 10px rgba(29,185,84,0.3)' : 'none',
              textAlign: 'center'
            }}
          >
            <i className="fas fa-sign-in-alt" style={{ marginRight: 5 }} /> Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            style={{
              padding: '10px 4px', border: 'none', borderRadius: 9, cursor: 'pointer',
              fontWeight: 700, fontSize: '0.78rem', transition: 'all 0.2s',
              background: activeTab === 'register' ? '#1DB954' : 'transparent',
              color: activeTab === 'register' ? 'white' : 'rgba(255,255,255,0.6)',
              boxShadow: activeTab === 'register' ? '0 2px 10px rgba(29,185,84,0.3)' : 'none',
              textAlign: 'center'
            }}
          >
            <i className="fas fa-user-plus" style={{ marginRight: 5 }} /> New Client
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            style={{
              padding: '10px 4px', border: 'none', borderRadius: 9, cursor: 'pointer',
              fontWeight: 700, fontSize: '0.78rem', transition: 'all 0.2s',
              background: activeTab === 'whatsapp' ? '#25d466' : 'transparent',
              color: activeTab === 'whatsapp' ? 'white' : 'rgba(255,255,255,0.6)',
              boxShadow: activeTab === 'whatsapp' ? '0 2px 10px rgba(37,212,102,0.3)' : 'none',
              textAlign: 'center'
            }}
          >
            <i className="fab fa-whatsapp" style={{ marginRight: 5 }} /> WA Help
          </button>
        </div>

        {/* Card Body */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(16px)',
          borderRadius: 20,
          padding: '2.2rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}>

          {/* ════ TAB 1: SIGN IN ════ */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: 600, marginBottom: 7 }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-envelope" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '0.9rem' }} />
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    placeholder="name@company.com"
                    required
                    style={{
                      width: '100%', padding: '12px 14px 12px 40px',
                      background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)',
                      borderRadius: 10, color: 'white', fontSize: '0.9rem', outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <label style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: 600 }}>
                    Password
                  </label>
                  <button type="button" onClick={handleForgotPass}
                    style={{ background: 'none', border: 'none', color: '#1DB954', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
                    Forgot?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-lock" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '0.9rem' }} />
                  <input
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    required
                    style={{
                      width: '100%', padding: '12px 42px 12px 40px',
                      background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)',
                      borderRadius: 10, color: 'white', fontSize: '0.9rem', outline: 'none'
                    }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '13px',
                  background: 'linear-gradient(135deg, #1DB954, #17a248)',
                  border: 'none', borderRadius: 10, color: 'white',
                  fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1, transition: 'all 0.2s',
                  boxShadow: '0 4px 18px rgba(29,185,84,0.4)', marginTop: 4
                }}
              >
                {loading ? <i className="fas fa-spinner fa-spin" /> : <><i className="fas fa-lock" style={{ marginRight: 8 }} /> Secure Sign In</>}
              </button>

              <div style={{
                marginTop: '1.4rem', padding: '12px 14px', borderRadius: 10,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8'
              }}>
                <span>Visiting for the first time?</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  style={{ background: 'none', border: 'none', color: '#25d466', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Create Client Account →
                </button>
              </div>
            </form>
          )}

          {/* ════ TAB 2: FIRST-TIME CLIENT REGISTRATION ════ */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister}>
              <div style={{
                padding: '10px 14px', borderRadius: 10, marginBottom: '1.2rem',
                background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.25)',
                color: '#25d466', fontSize: '0.78rem', lineHeight: 1.5
              }}>
                <i className="fas fa-shield-alt" style={{ marginRight: 6 }} />
                <strong>First-time client?</strong> Register to instantly generate your 256-bit encrypted document vault and compliance tracker.
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 5 }}>
                  Full Name / Business Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={regForm.name}
                  onChange={handleRegChange}
                  placeholder="e.g. Rahul Sharma / ABC Traders"
                  required
                  style={{
                    width: '100%', padding: '10px 14px',
                    background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)',
                    borderRadius: 10, color: 'white', fontSize: '0.88rem', outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 5 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={regForm.email}
                  onChange={handleRegChange}
                  placeholder="name@domain.com"
                  required
                  style={{
                    width: '100%', padding: '10px 14px',
                    background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)',
                    borderRadius: 10, color: 'white', fontSize: '0.88rem', outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 5 }}>
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
                    width: '100%', padding: '10px 14px',
                    background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)',
                    borderRadius: 10, color: 'white', fontSize: '0.88rem', outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 5 }}>
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
                      width: '100%', padding: '10px 12px',
                      background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)',
                      borderRadius: 10, color: 'white', fontSize: '0.88rem', outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 5 }}>
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
                      width: '100%', padding: '10px 12px',
                      background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)',
                      borderRadius: 10, color: 'white', fontSize: '0.88rem', outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '13px',
                  background: 'linear-gradient(135deg, #1DB954, #17a248)',
                  border: 'none', borderRadius: 10, color: 'white',
                  fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1, transition: 'all 0.2s',
                  boxShadow: '0 4px 18px rgba(29,185,84,0.4)'
                }}
              >
                {loading ? <i className="fas fa-spinner fa-spin" /> : <><i className="fas fa-check-circle" style={{ marginRight: 8 }} /> Create My Vault Account</>}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  style={{ background: 'none', border: 'none', color: '#1DB954', fontWeight: 700, cursor: 'pointer' }}
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          {/* ════ TAB 3: WHATSAPP INSTANT ASSISTANCE ════ */}
          {activeTab === 'whatsapp' && (
            <form onSubmit={handleWhatsAppSupport}>
              <div style={{
                padding: '12px', borderRadius: 10, marginBottom: '1.2rem',
                background: 'rgba(37,212,102,0.1)', border: '1px solid rgba(37,212,102,0.25)',
                color: '#25d466', fontSize: '0.8rem', lineHeight: 1.5
              }}>
                <i className="fab fa-whatsapp" style={{ marginRight: 6, fontSize: '1rem' }} />
                <strong>Direct Desk Support (+91 78272 25372)</strong><br />
                Our administration desk will instantly verify your number and dispatch your portal login credentials.
              </div>

              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: 600, marginBottom: 7 }}>
                  Your Mobile Number
                </label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-phone" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '0.9rem' }} />
                  <input
                    type="tel"
                    value={waPhone}
                    onChange={e => setWaPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    required
                    style={{
                      width: '100%', padding: '12px 14px 12px 40px',
                      background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)',
                      borderRadius: 10, color: 'white', fontSize: '0.9rem', outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.4rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: 600, marginBottom: 7 }}>
                  What do you need help with?
                </label>
                <select
                  value={waReason}
                  onChange={e => setWaReason(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 14px',
                    background: '#0a1f44', border: '1.5px solid rgba(255,255,255,0.15)',
                    borderRadius: 10, color: 'white', fontSize: '0.88rem', outline: 'none'
                  }}
                >
                  <option value="onboarding">I am a first-time client (New Account Activation)</option>
                  <option value="credentials">I need my existing login credentials</option>
                  <option value="reset">I forgot my password</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%', padding: '13px',
                  background: 'linear-gradient(135deg, #25d466, #128c7e)',
                  border: 'none', borderRadius: 10, color: 'white',
                  fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(37,212,102,0.4)', transition: 'all 0.2s'
                }}
              >
                <i className="fab fa-whatsapp" style={{ marginRight: 8, fontSize: '1.1rem' }} />
                Request Credentials on WhatsApp
              </button>
            </form>
          )}

        </div>

        {/* Security Badge */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.78rem' }}>
          <i className="fas fa-lock" style={{ marginRight: 6 }} />
          All portal connections are protected by 256-bit SSL and role-enforced access.
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.82rem' }}>
            ← Back to Cloud Ledger Home
          </Link>
        </div>

      </div>
    </div>
  )
}
