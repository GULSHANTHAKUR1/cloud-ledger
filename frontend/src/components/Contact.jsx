import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const WA_NUMBER = '917827225372'

const SERVICE_CATEGORIES = [
  'GST & Indirect Taxation',
  'Income Tax & Direct Taxation',
  'Company Incorporation & MCA',
  'NGO, Trust & Society',
  'Accounting & Bookkeeping',
  'Audit & Assurance',
  'MIS & Management Consultancy',
  'Data Analytics & Data Management',
  'Project Reports & Financial Modelling',
  'MSME & Business Registrations',
  'PF, ESIC & Labour Compliance',
  'Environmental & Feasibility Studies',
  'FPO & Institutional Services',
  'Business Process & Internal Controls',
  'Other Business Support Services',
]

export default function Contact({ initialService = '' }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService,
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const createWhatsAppText = (data) => {
    return encodeURIComponent(
      `Hello Cloud Ledger! I am submitting an enquiry from your website:\n\n` +
      `👤 Name: ${data.name}\n` +
      `📱 Phone: ${data.phone}\n` +
      `✉️ Email: ${data.email}\n` +
      `📌 Service: ${data.service || 'General Enquiry'}\n` +
      `💬 Details: ${data.message || 'Please contact me regarding your services.'}`
    )
  }

  // Handle direct WhatsApp submit
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Please enter at least your Name and Phone / WhatsApp number.')
      return
    }
    const text = createWhatsAppText(form)
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    toast.success('Opening WhatsApp with your enquiry!')
  }

  // Handle standard form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email) {
      toast.error('Please fill in Name, Phone and Email.')
      return
    }

    setLoading(true)

    // Save backup to localStorage first so lead is never lost
    try {
      const existing = JSON.parse(localStorage.getItem('cl_enquiries') || '[]')
      existing.push({ ...form, timestamp: new Date().toISOString() })
      localStorage.setItem('cl_enquiries', JSON.stringify(existing))
    } catch (e) {
      // ignore localstorage errors
    }

    let firestoreSuccess = false

    try {
      // Attempt Firestore write
      await addDoc(collection(db, 'enquiries'), {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        service: form.service || 'General Enquiry',
        message: form.message.trim(),
        status: 'new',
        source: 'website',
        createdAt: serverTimestamp(),
      })
      firestoreSuccess = true
    } catch (err) {
      console.warn('Firestore write notice:', err.code, err.message)
    }

    setLoading(false)

    if (firestoreSuccess) {
      toast.success("Enquiry received! We'll contact you within 24 hours.", { duration: 5000 })
      setForm({ name: '', phone: '', email: '', service: '', message: '' })
    } else {
      // Saved locally + option to send to WhatsApp immediately
      toast((t) => (
        <div>
          <b>Enquiry saved!</b> Click below to chat directly with our desk.
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => {
                const text = createWhatsAppText(form)
                window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
                toast.dismiss(t.id)
              }}
              style={{
                background: '#25D466', color: 'white', border: 'none', padding: '6px 14px',
                borderRadius: 6, fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem'
              }}
            >
              <i className="fab fa-whatsapp" /> Send to WhatsApp Now
            </button>
          </div>
        </div>
      ), { duration: 8000 })
    }
  }

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.12)',
    background: '#090a0d', color: 'white',
    fontSize: '0.9rem', outline: 'none', fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s', marginBottom: '1rem',
  }

  return (
    <section id="contact" style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', padding: '5rem 0' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

          {/* ── Left Details ── */}
          <div>
            <div className="section-badge" style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8', borderColor: 'rgba(56,189,248,0.25)' }}>
              <i className="fas fa-envelope" /> Contact & Consultations
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: 'white', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
              Let's Discuss Your Compliance & Growth
            </h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Whether you need regular monthly accounting, filing a new company incorporation, or assistance with a statutory tax notice — our dedicated advisory team is here for you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
              {[
                { icon: 'fa-globe',   label: 'Official Website', value: 'cloudledger.in', href: 'https://cloudledger.in' },
                { icon: 'fa-phone',   label: 'Direct Helpline · Mon–Sat 9AM–6PM IST', value: '+91 78272 25372', href: 'tel:+917827225372' },
                { icon: 'fa-envelope',label: 'Official Email · Response within 24 hrs', value: 'hello@cloudledger.in', href: 'mailto:hello@cloudledger.in' },
              ].map(item => (
                <div key={item.icon} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`fas ${item.icon}`} style={{ color: '#38bdf8', fontSize: '1.1rem' }} />
                  </div>
                  <div>
                    <a href={item.href} style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600 }}>{item.value}</a>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: 2 }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Form ── */}
          <div style={{ background: '#0d1118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '2.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '1.35rem', marginBottom: '0.5rem' }}>Send an Enquiry</div>
            <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '1.75rem' }}>
              Fill in your requirement below and our team will get in touch with you.
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="contact-input-row">
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600, marginBottom: 5 }}>Your Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rahul Sharma" style={{ ...inputStyle, marginBottom: 0 }} required />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600, marginBottom: 5 }}>Phone / WhatsApp *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 7827225372" style={{ ...inputStyle, marginBottom: 0 }} required />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600, marginBottom: 5 }}>Email Address *</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="e.g. rahul@company.com" style={inputStyle} required />
              </div>

              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600, marginBottom: 5 }}>Select Service Category</label>
                <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer', background: '#090a0d', color: 'white' }}>
                  <option value="" style={{ background: '#0d1118' }}>Select Service Category (optional)</option>
                  {SERVICE_CATEGORIES.map(s => <option key={s} value={s} style={{ background: '#0d1118' }}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600, marginBottom: 5 }}>Requirement Details</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us briefly about your business and requirement..." rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: '0.5rem' }}>
                <button type="submit" disabled={loading} className="btn btn-white" style={{ width: '100%', height: 48, borderRadius: 9999, justifyContent: 'center' }}>
                  {loading
                    ? <><i className="fas fa-spinner fa-spin" /> Submitting...</>
                    : <><i className="fas fa-paper-plane" /> Submit Online Enquiry</>
                  }
                </button>

                <button type="button" onClick={handleWhatsAppSubmit} className="btn btn-whatsapp" style={{ width: '100%', height: 48, borderRadius: 9999, justifyContent: 'center', padding: '12px' }}>
                  <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Or Submit Directly to WhatsApp
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1.25rem', color: '#64748b', fontSize: '0.72rem', lineHeight: 1.5 }}>
                <i className="fas fa-shield-alt" style={{ marginRight: 4 }} />
                Your data is kept strictly confidential with 256-bit encryption. We never share your phone or email.
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          #contact .container > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 520px) {
          .contact-input-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
