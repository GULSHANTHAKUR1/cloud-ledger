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
    // Pop up promptly when the website is opened
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 800)

    const handleOpenEnquiry = () => setIsOpen(true)
    window.addEventListener('open-enquiry-popup', handleOpenEnquiry)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('open-enquiry-popup', handleOpenEnquiry)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
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
      background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.25rem', animation: 'fadeIn 0.3s ease'
    }} onClick={handleClose}>
      
      <div style={{
        background: '#121316', borderRadius: 24, maxWidth: 480, width: '100%',
        overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative', animation: 'popIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Top Header */}
        <div style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(30, 96, 255, 0.18) 0%, #0d0f14 70%)',
          padding: '2rem 2rem 1.5rem', color: 'white', position: 'relative',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {/* Close X */}
          <button onClick={handleClose} style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '50%', width: 32, height: 32, color: 'white', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem'
          }}>✕</button>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10b981', padding: '3px 12px', borderRadius: 100,
            fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 10
          }}>
            <span style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%' }} />
            Free Consultation
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 6px', color: 'white', lineHeight: 1.25, fontFamily: "'Inter', sans-serif" }}>
            Speak with an Advisory Specialist
          </h3>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.5 }}>
            Get expert clarity on GST, ITR, Company Incorporation, or Accounting for your business.
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.8rem 2rem 2rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: 5 }}>
                Your Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Vikram Verma"
                style={{ width: '100%', padding: '11px 14px', borderRadius: 10, background: '#090a0d', border: '1.5px solid rgba(255,255,255,0.12)', color: 'white', fontSize: '0.88rem', outline: 'none' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: 5 }}>
                Mobile / WhatsApp Number *
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 7827225372"
                style={{ width: '100%', padding: '11px 14px', borderRadius: 10, background: '#090a0d', border: '1.5px solid rgba(255,255,255,0.12)', color: 'white', fontSize: '0.88rem', outline: 'none' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.4rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: 5 }}>
                Service You Need Assistance With
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px 14px', borderRadius: 10, background: '#090a0d', border: '1.5px solid rgba(255,255,255,0.12)', color: 'white', fontSize: '0.88rem', outline: 'none' }}
              >
                <option value="GST Registration & Monthly Returns" style={{ background: '#121316', color: 'white' }}>GST Registration & Monthly Returns</option>
                <option value="Income Tax Return (ITR) Filing" style={{ background: '#121316', color: 'white' }}>Income Tax Return (ITR) Filing</option>
                <option value="Private Limited / LLP Incorporation" style={{ background: '#121316', color: 'white' }}>Private Limited / LLP Incorporation</option>
                <option value="Monthly Bookkeeping & Accounting" style={{ background: '#121316', color: 'white' }}>Monthly Bookkeeping & Accounting</option>
                <option value="Internal Audit & Process Review" style={{ background: '#121316', color: 'white' }}>Internal Audit & Process Review</option>
                <option value="NGO 12A / 80G Registration" style={{ background: '#121316', color: 'white' }}>NGO 12A / 80G Registration</option>
                <option value="MSME Udyam Registration" style={{ background: '#121316', color: 'white' }}>MSME Udyam Registration</option>
                <option value="Other Business Support" style={{ background: '#121316', color: 'white' }}>Other Business Support</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', height: 46, borderRadius: 9999,
                  background: '#ffffff', color: '#000000',
                  fontWeight: 700, fontSize: '0.92rem', cursor: loading ? 'not-allowed' : 'pointer',
                  border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                }}
              >
                {loading ? <><i className="fas fa-spinner fa-spin" /> Submitting...</> : <><i className="fas fa-paper-plane" /> Request Free Callback</>}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppSend}
                style={{
                  width: '100%', height: 46, borderRadius: 9999,
                  background: '#25d466', color: '#ffffff',
                  fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
                  border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Connect on WhatsApp
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
              <button
                type="button"
                onClick={handleClose}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.78rem', cursor: 'pointer' }}
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

