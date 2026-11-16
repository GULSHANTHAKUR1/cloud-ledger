import React from 'react'

const FEATURES_DATA = [
  {
    id: 'gst-invoicing',
    icon: 'fas fa-file-invoice-dollar',
    accentColor: 'var(--primary-2, #1DB954)',
    accentBg: 'rgba(29, 185, 84, 0.1)',
    badge: 'GST & Invoicing',
    title: 'Smart Invoicing & e-Way',
    description: 'Generate GST-compliant invoices with automatic CGST/SGST/IGST splits, real-time IRP e-invoicing generation, and 1-click WhatsApp delivery.',
    points: ['IRN & QR Code Generation', 'Automated GST Calculation', 'Fast e-Way Bill Dispatch'],
    actionText: 'Explore Invoicing',
    actionHref: '#services'
  },
  {
    id: 'accounting-bookkeeping',
    icon: 'fas fa-chart-line',
    accentColor: 'var(--primary-3, #3B82F6)',
    accentBg: 'rgba(59, 130, 246, 0.1)',
    badge: 'Accounting & MIS',
    title: 'Automated Cloud Ledger',
    description: 'AI-assisted double-entry bookkeeping with connected banking feeds (ICICI, SBI, HDFC) and instant Profit & Loss and Balance Sheet analytics.',
    points: ['Bank Auto-Reconciliation', 'Real-Time Financial MIS', 'Multi-Currency 200+ Support'],
    actionText: 'View Tax Calculators',
    actionHref: '#calculators'
  },
  {
    id: 'tax-compliance',
    icon: 'fas fa-shield-halved',
    accentColor: 'var(--primary-4, #F59E0B)',
    accentBg: 'rgba(245, 158, 11, 0.12)',
    badge: 'Zero Penalties',
    title: 'GST & Tax Compliance',
    description: 'Complete statutory filing for GSTR-1, GSTR-3B, TDS, and Corporate ITR with proactive ITC mismatch detection to eliminate penalties.',
    points: ['GSTR-1 & 3B Direct Sync', 'ITC Mismatch Detection', 'Certified CA & CS Oversight'],
    actionText: 'Browse Compliance',
    actionHref: '#services'
  },
  {
    id: 'client-vault',
    icon: 'fas fa-vault',
    accentColor: 'var(--primary-1, #0A1F44)',
    accentBg: 'rgba(10, 31, 68, 0.08)',
    badge: 'AES-256 Security',
    title: 'Client Vault & Portals',
    description: 'Bank-grade encrypted digital vault for instant access to filed returns, challans, and incorporation certificates, plus developer REST APIs.',
    points: ['Encrypted Document Vault', 'Role-Based Client Access', 'Developer APIs & Webhooks'],
    actionText: 'Speak with Experts',
    actionHref: '#contact'
  }
]

export default function Features({ features = FEATURES_DATA } = {}) {
  const displayFeatures = features && features.length > 0 ? features : FEATURES_DATA
  return (
    <section id="features" style={{
      padding: '90px 1.5rem',
      background: 'var(--gray-50, #f8fafc)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--primary-2, #1DB954)',
              display: 'inline-block',
              animation: 'pulseDot 2s infinite'
            }} />
            ENTERPRISE CAPABILITIES
          </div>

          <h2 className="section-title">
            Engineered for Modern Indian <span className="accent">Enterprises</span>
          </h2>

          <p className="section-desc" style={{ margin: '0 auto' }}>
            A unified suite designed after modern financial platforms — merging automated billing, continuous statutory compliance, and military-grade client data protection.
          </p>
        </div>

        {/* 4-Column Feature Card Grid */}
        <div className="features-grid">
          {displayFeatures.map((feat) => (
            <div
              key={feat.id}
              className="feature-card"
            >
              {/* Top Accent Line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: feat.accentColor,
                opacity: 0.8
              }} />

              <div>
                {/* Icon & Badge Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: feat.accentBg,
                    color: feat.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    <i className={feat.icon} />
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.4px',
                    textTransform: 'uppercase',
                    color: feat.accentColor,
                    background: feat.accentBg,
                    padding: '4px 10px',
                    borderRadius: 100
                  }}>
                    {feat.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: 'var(--primary-1, #0A1F44)',
                  marginBottom: '0.85rem',
                  lineHeight: 1.3
                }}>
                  {feat.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.88rem',
                  color: 'var(--gray-500, #64748b)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem'
                }}>
                  {feat.description}
                </p>

                {/* Key Points */}
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 1.75rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}>
                  {feat.points.map((pt, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: '0.8rem',
                        fontFamily: "'Inter', sans-serif",
                        color: 'var(--gray-700, #334155)',
                        fontWeight: 500
                      }}
                    >
                      <i className="fas fa-check-circle" style={{ color: feat.accentColor, fontSize: '0.85rem' }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(10, 31, 68, 0.06)' }}>
                <a
                  href={feat.actionHref}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: feat.accentColor,
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'gap 0.2s ease',
                    fontFamily: "'Inter', sans-serif"
                  }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >
                  <span>{feat.actionText}</span>
                  <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FEATURES_DATA }
