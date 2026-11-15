import React, { useState, useEffect } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import toast from 'react-hot-toast'

const WA_NUMBER = '917827225372'

export default function EnquiryPopup() {
  const [isOpen, setIsOpen]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [form, setForm]         = useState({
    name: '',
    phone: '',
    service: 'GST & Indirect Taxation',
    message: ''
  })

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('cl_popup_dismissed')
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2500) // popup 2.5 seconds after load
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('cl_popup_dismissed', 'true')
  }

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const createWhatsAppText = (data) => {
    return encodeURIComponent(
      `Hello Cloud Ledger! I want a quick consultation from your website:\n\n` +
      `👤 Name: ${data.name}\n` +
      `📱 Mobile: ${data.phone}\n` +
      `📌 Service: ${data.service}\n` +
      `💬 Query: ${data.message || 'Please contact me regarding this service.'}`
    )
  }

  const handleWhatsAppSend = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Please enter your Name and Mobile number.')
      return
    }
    const text = createWhatsAppText(form)
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    handleClose()
    toast.success('Opening WhatsApp with your consultation request!')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Please enter your Name and Mobile number.')
      return
    }

    setLoading(true)

    // Save backup to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('cl_enquiries') || '[]')
      existing.unshift({ ...form, email: 'Via Popup', timestamp: new Date().toISOString() })
      localStorage.setItem('cl_enquiries', JSON.stringify(existing))
    } catch (err) {}

    try {
      await addDoc(collection(db, 'enquiries'), {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: 'Via Website Popup',
        service: form.service,
        message: form.message.trim(),
        status: 'new',
        source: 'Website Popup',
        createdAt: serverTimestamp()
      })
    } catch (err) {
      console.warn('Popup firestore write notice:', err.message)
    }

    setLoading(false)
    handleClose()
    toast.success('Thank you! Our advisory team will contact you shortly.', { duration: 5000 })
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(6, 15, 34, 0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.25rem', animation: 'fadeIn 0.3s ease'
    }} onClick={handleClose}>
      
      <div style={{
        background: 'white', borderRadius: 24, maxWidth: 480, width: '100%',
        overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
        position: 'relative', animation: 'popIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Top Gradient Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0A1F44 0%, #1a3461 60%, #1DB954 100%)',
          padding: '2rem 2rem 1.75rem', color: 'white', position: 'relative'
        }}>
          {/* Close X */}
          <button onClick={handleClose} style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
            width: 32, height: 32, color: 'white', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem'
          }}>✕</button>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(29,185,84,0.25)', border: '1px solid rgba(29,185,84,0.4)',
            color: '#25d466', padding: '3px 12px', borderRadius: 100,
            fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 10
          }}>
            <span style={{ width: 6, height: 6, background: '#25d466', borderRadius: '50%' }} />
            Free Consultation
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 6px', color: 'white', lineHeight: 1.25 }}>
            Talk to a Compliance Specialist
          </h3>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '0.84rem', lineHeight: 1.5 }}>
            Get expert clarity on GST, ITR, Company Incorporation, or Accounting for your business.
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>
                Your Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Vikram Verma"
                style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>
                Mobile / WhatsApp Number *
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 7827225372"
                style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>
                Service You Need Assistance With
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none', background: 'white' }}
              >
                <option>GST Registration & Monthly Returns</option>
                <option>Income Tax Return (ITR) Filing</option>
                <option>Private Limited / LLP Incorporation</option>
                <option>Monthly Bookkeeping & Accounting</option>
                <option>Internal Audit & Process Review</option>
                <option>NGO 12A / 80G Registration</option>
                <option>MSME Udyam Registration</option>
                <option>Other Business Support</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-navy"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.92rem' }}
              >
                {loading ? <><i className="fas fa-spinner fa-spin" /> Submitting...</> : <><i className="fas fa-paper-plane" /> Request Free Callback</>}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="btn btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center', padding: '11px', fontSize: '0.9rem' }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Or Connect Directly on WhatsApp
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={handleClose}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                No thanks, I will browse first
              </button>
            </div>
          </form>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
      `}</style>
    </div>
  )
}

