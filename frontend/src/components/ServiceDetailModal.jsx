import React from 'react'

const WA_NUMBER = '917827225372'

export default function ServiceDetailModal({ service, onClose, onEnquire }) {
  if (!service) return null

  const waText = encodeURIComponent(`Hello Cloud Ledger! I am interested in ${service.title}. Please provide more details and consultation.`)
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waText}`

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(6, 15, 34, 0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem', animation: 'fadeIn 0.2s ease',
    }} onClick={onClose}>
      <div style={{
        background: 'white', borderRadius: 20, width: '100%', maxWidth: 760,
        maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)', position: 'relative',
        animation: 'scaleUp 0.25s ease',
      }} onClick={e => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 20, right: 20,
          background: '#f1f5f9', border: 'none', borderRadius: '50%',
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#64748b', fontSize: '1rem', transition: 'all 0.2s',
        }} onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
           onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}>
          ✕
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 36, background: '#ecfdf5', width: 60, height: 60, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {service.icon || '📋'}
          </div>
          <div>
            <div style={{ color: '#16a34a', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {service.categoryName || 'Professional Service'}
            </div>
            <h2 style={{ color: '#0A1F44', fontSize: '1.6rem', fontWeight: 800, margin: '2px 0 0' }}>
              {service.title}
            </h2>
          </div>
        </div>

        {/* Blueprint Standard Template: Overview */}
        <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: 12, borderLeft: '4px solid #1DB954' }}>
          <div style={{ fontWeight: 700, color: '#0A1F44', fontSize: '0.9rem', marginBottom: 4 }}>Purpose & Business Benefits</div>
          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {service.overview || service.desc}
          </p>
        </div>

        {/* Two-Column Grid: Applicability & Documents */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#ffffff', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#0A1F44', fontSize: '0.88rem', marginBottom: 8 }}>
              <i className="fas fa-user-check" style={{ color: '#3b82f6' }} /> Who Needs This Service
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: '#64748b', fontSize: '0.8rem', lineHeight: 1.6 }}>
              {(service.eligibility || [
                'Proprietorships, Partnerships & LLPs',
                'Private Limited & Public Companies',
                'Startups and Growing Businesses',
                'Entities crossing statutory turnover thresholds'
              ]).map((item, idx) => (
                <li key={idx} style={{ marginBottom: 4 }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ background: '#ffffff', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#0A1F44', fontSize: '0.88rem', marginBottom: 8 }}>
              <i className="fas fa-file-alt" style={{ color: '#f59e0b' }} /> Required Documents
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: '#64748b', fontSize: '0.8rem', lineHeight: 1.6 }}>
              {(service.documents || [
                'PAN Card & Aadhaar of Directors/Partners',
                'Business Address Proof (Electricity bill / NOC / Rent agreement)',
                'Bank Account Details / Cancelled Cheque',
                'Certificate of Incorporation / Registration (if applicable)'
              ]).map((item, idx) => (
                <li key={idx} style={{ marginBottom: 4 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Procedure & Timeline */}
        <div style={{ background: '#ffffff', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#0A1F44', fontSize: '0.88rem', marginBottom: 10 }}>
            <i className="fas fa-tasks" style={{ color: '#10b981' }} /> Step-by-Step Procedure & Timeline
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, textAlign: 'center' }}>
            {[
              { step: '1', title: 'Consultation', sub: 'Requirement & Document review' },
              { step: '2', title: 'Filing', sub: 'Application on Govt Portal' },
              { step: '3', title: 'Verification', sub: 'Departmental response & queries' },
              { step: '4', title: 'Completion', sub: 'Certificate / Acknowledgement' },
            ].map(s => (
              <div key={s.step} style={{ background: '#f8fafc', padding: '10px 8px', borderRadius: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0A1F44', color: 'white', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                  {s.step}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#0A1F44' }}>{s.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#64748b', background: '#ecfdf5', padding: '8px 14px', borderRadius: 8 }}>
            <span><i className="fas fa-clock" style={{ color: '#16a34a', marginRight: 6 }} /> <b>Estimated Timeline:</b> {service.timeline || '3–7 working days (subject to statutory portal approval)'}</span>
            <span style={{ color: '#16a34a', fontWeight: 700 }}>Government Portal Compliant</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => { onClose(); onEnquire(service); }} className="btn btn-green btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
            <i className="fas fa-paper-plane" /> Enquire for this Service
          </button>
          <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
            <i className="fab fa-whatsapp" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @media (max-width: 600px) {
          .modal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

