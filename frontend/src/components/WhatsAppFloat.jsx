import { useState, useEffect } from 'react'

const WA_NUMBER = '917827225372'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hello%20Cloud%20Ledger!%20I%20need%20assistance.`

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)

  // Auto-open bubble after 6 seconds
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 6000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
      {/* Bubble */}
      {open && (
        <div style={{
          background: 'white', borderRadius: 14, padding: '14px 18px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)', maxWidth: 240,
          animation: 'slideUp 0.3s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div style={{ fontWeight: 700, color: '#0A1F44', fontSize: '0.88rem' }}>💬 Cloud Ledger Support</div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1 }}>✕</button>
          </div>
          <div style={{ color: '#64748b', fontSize: '0.78rem', marginBottom: 12, lineHeight: 1.5 }}>
            We're online! Chat with us for instant help on any service.
          </div>
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            background: 'linear-gradient(135deg, #25D466, #128C7E)', color: 'white',
            padding: '9px 14px', borderRadius: 8, textDecoration: 'none',
            fontSize: '0.82rem', fontWeight: 700,
          }}>
            <i className="fab fa-whatsapp" /> Start Chat
          </a>
        </div>
      )}

      {/* Float button */}
      <button onClick={() => setOpen(!open)} style={{
        width: 58, height: 58, borderRadius: '50%',
        background: 'linear-gradient(135deg, #25D466, #128C7E)',
        color: 'white', border: 'none', fontSize: '26px',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 30px rgba(37,212,102,0.5)',
        animation: 'waPulse 3s ease-in-out infinite',
        transition: 'transform 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.animation = 'none' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.animation = 'waPulse 3s ease-in-out infinite' }}
        title="Chat on WhatsApp">
        <i className="fab fa-whatsapp" />
      </button>

      <style>{`
        @keyframes waPulse {
          0%,100% { box-shadow: 0 8px 30px rgba(37,212,102,0.5); }
          50% { box-shadow: 0 8px 40px rgba(37,212,102,0.7), 0 0 0 10px rgba(37,212,102,0.1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

