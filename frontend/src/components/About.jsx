import React from 'react'

export default function About() {
  const pillars = [
    {
      icon: '🛡️',
      title: 'Regulatory Accuracy',
      desc: 'Strict compliance with MCA, GST, Income Tax, and labour laws with every filing validated before submission.'
    },
    {
      icon: '🔒',
      title: 'Private & Secure Vault',
      desc: 'Documents and sensitive records stored securely with role-based access. Zero public link leakage.'
    },
    {
      icon: '⚡',
      title: 'Direct Accountability',
      desc: 'Assigned managers oversee every task, from registration to annual audit reconciliation.'
    },
    {
      icon: '🤝',
      title: 'Dedicated Client Support',
      desc: 'Direct communication via digital portal and WhatsApp for fast query resolution and live status updates.'
    }
  ]

  return (
    <section id="about" style={{ background: '#050608', borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '5rem 0' }}>
      <div className="container">
        
        {/* Top Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <div className="section-badge" style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#38bdf8' }}>
              <i className="fas fa-building" /> About Cloud Ledger
            </div>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              Empowering Indian Businesses With <br />
              <span style={{
                background: 'linear-gradient(135deg, #38bdf8 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Structured Compliance
              </span>
            </h2>
            <p className="section-desc" style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
              Cloud Ledger is a modern business management and professional advisory platform. We unite technical compliance expertise with modern cloud infrastructure to deliver seamless taxation, company registration, and accounting operations.
            </p>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Whether you are an emerging startup incorporating your first Private Limited company, an SME navigating monthly GST and TDS filings, or an established institutional enterprise requiring internal audit reviews, Cloud Ledger ensures peace of mind through diligent execution.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="about-mission-grid">
              <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '1rem' }}>
                <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem' }}>Our Mission</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 4 }}>
                  To remove compliance friction so entrepreneurs can focus entirely on scaling their core operations.
                </div>
              </div>
              <div style={{ borderLeft: '3px solid #1e60ff', paddingLeft: '1rem' }}>
                <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem' }}>Our Vision</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 4 }}>
                  To become India's premier integrated digital business compliance and management ecosystem.
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div style={{
            background: '#0d1118',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 24, padding: '2.5rem', color: 'white', position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🇮🇳</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>
              Engineered for the Indian Regulatory Ecosystem
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              From the Ministry of Corporate Affairs (MCA) to the GSTN Common Portal, Income Tax e-Filing, and EPFO/ESIC portals, our systems align directly with India's statutory authorities.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)' }}>
              <div><i className="fas fa-check" style={{ color: '#10b981', marginRight: 8 }} /> Multi-state GST filing & reconciliation</div>
              <div><i className="fas fa-check" style={{ color: '#10b981', marginRight: 8 }} /> Complete MCA & ROC secretarial governance</div>
              <div><i className="fas fa-check" style={{ color: '#10b981', marginRight: 8 }} /> Section 8, Trust, 12A/80G NGO compliance</div>
              <div><i className="fas fa-check" style={{ color: '#10b981', marginRight: 8 }} /> MSME Udyam & priority sector support</div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {pillars.map((p, i) => (
            <div key={i} style={{
              background: '#0d1118', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 16,
              padding: '1.5rem', transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{p.icon}</div>
              <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1rem', marginBottom: '0.5rem' }}>{p.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .container > div:first-child { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          #about .container > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 550px) {
          #about .container > div:last-child { grid-template-columns: 1fr !important; }
          .about-mission-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
      `}</style>
    </section>
  )
}

