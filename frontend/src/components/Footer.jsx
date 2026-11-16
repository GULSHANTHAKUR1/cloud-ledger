import React, { useState } from 'react'

const WA_NUMBER = '917827225372'
const WA_CAREERS = `https://wa.me/${WA_NUMBER}?text=Hello%20Cloud%20Ledger%20HR!%20I%20am%20interested%20in%20career%20opportunities.`

const MODAL_CONTENT = {
  terms: {
    title: 'Terms & Conditions of Service',
    badge: 'Legal & Governance',
    updated: 'November 2026',
    sections: [
      {
        heading: '1. Introduction & Acceptance',
        body: 'Welcome to Cloud Ledger (cloudledger.in). By engaging our professional services or accessing our digital portal, you agree to comply with and be bound by these Terms and Conditions. These terms govern all statutory compliance, company governance, taxation, and accounting advisory services rendered by Cloud Ledger.'
      },
      {
        heading: '2. Scope of Professional Services',
        body: 'Cloud Ledger provides assistance with statutory filings, including GST returns, Income Tax returns (ITR), Ministry of Corporate Affairs (MCA) secretarial filings, accounting, and internal review. All services are performed in accordance with applicable Indian laws, rules, and departmental circulars.'
      },
      {
        heading: '3. Client Responsibilities & Accuracy of Information',
        body: 'Clients must provide complete, accurate, and authentic invoices, books, and statutory credentials before statutory cut-off dates. Cloud Ledger relies on the information supplied by the client and does not accept liability for statutory penalties resulting from delayed, incomplete, or inaccurate source data.'
      },
      {
        heading: '4. Confidentiality & Encrypted Client Vault',
        body: 'We maintain strict confidentiality concerning all client financial data, business records, and tax documents. All uploaded records and filed returns are housed within bank-grade encrypted environments and will never be disclosed to third parties without prior authorization, except where mandated by statutory authorities.'
      },
      {
        heading: '5. Governing Law & Jurisdiction',
        body: 'These Terms of Service are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the competent courts in India.'
      }
    ]
  },
  privacy: {
    title: 'Privacy & Data Protection Policy',
    badge: 'Data Security',
    updated: 'November 2026',
    sections: [
      {
        heading: '1. Our Privacy Commitment',
        body: 'At Cloud Ledger, privacy and data integrity are fundamental to our business. This Privacy Policy details how we collect, process, and protect your company credentials, personal data, and financial statements in accordance with the Digital Personal Data Protection Act (DPDP).'
      },
      {
        heading: '2. Information We Collect',
        body: 'We collect business registration details (PAN, GSTIN, CIN), authorized signatory KYC (Aadhaar, PAN), financial books, bank statements, and transactional invoices strictly for fulfilling statutory filing obligations.'
      },
      {
        heading: '3. Bank-Grade 256-Bit Encryption',
        body: 'All communications, authentication requests, and document transfers are protected with TLS 1.3 encryption in transit and AES-256 encryption at rest. Multi-tier access controls ensure only authorized compliance specialists assigned to your account can inspect your records.'
      },
      {
        heading: '4. Non-Disclosure & Third-Party Sharing',
        body: 'We will never sell, rent, or monetize your business or financial records. Data is transmitted exclusively to official Indian statutory portals (e.g. GSTN, Income Tax e-Filing, MCA21) upon your authorized instructions.'
      },
      {
        heading: '5. Your Rights',
        body: 'You retain full rights to inspect, download, update, or request the archival of documents in your private Client Vault at any time through our portal or by contacting privacy@cloudledger.in.'
      }
    ]
  },
  assured: {
    title: 'Assured Compliance & Service Quality Terms',
    badge: 'Service Level Agreement',
    updated: 'November 2026',
    sections: [
      {
        heading: '1. On-Time Filing Commitment',
        body: 'For all compliance records and invoices provided before internal cutoff dates (minimum 3 business days prior to statutory deadlines), Cloud Ledger guarantees timely filing on government portals to prevent statutory late fees.'
      },
      {
        heading: '2. Multi-Tier Regulatory Oversight',
        body: 'Every return, reconciliation, and incorporation filing passes through a multi-tier review process by senior compliance specialists to eliminate clerical mismatches and Input Tax Credit (ITC) discrepancies.'
      },
      {
        heading: '3. Transparent Status Tracking',
        body: 'Clients receive real-time updates and direct confirmation receipts (ARN, Challan receipts, e-Filing acknowledgements) directly uploaded to their private Client Vault.'
      },
      {
        heading: '4. Dedicated Operations Support',
        body: 'Clients have direct access to their assigned compliance relationship manager via digital portal and official WhatsApp desk for prompt query resolution.'
      }
    ]
  },
  security: {
    title: 'Information Security & Architecture Policy',
    badge: 'ISO 27001 Aligned',
    updated: 'November 2026',
    sections: [
      {
        heading: '1. Enterprise Security Standards',
        body: 'Our platform is engineered in alignment with ISO 27001:2013 Information Security Management System (ISMS) guidelines, implementing robust safeguards across physical, network, and application layers.'
      },
      {
        heading: '2. Role-Based Access Control (RBAC)',
        body: 'Strict role separation ensures that clients only access their private organization records, while operational staff access only assigned tasks with audited permission logs.'
      },
      {
        heading: '3. Redundancy & High Availability',
        body: 'Our cloud database and storage systems maintain automatic failovers and daily encrypted snapshots, guaranteeing high service availability and disaster resilience.'
      },
      {
        heading: '4. Vulnerability Management & Threat Monitoring',
        body: 'Continuous automated vulnerability scanning and intrusion monitoring protect against credential compromise, SQL injections, and unauthorized perimeter access.'
      }
    ]
  },
  careers: {
    title: 'Careers at Cloud Ledger',
    badge: 'Join Our Team',
    updated: 'Open Positions',
    sections: [
      {
        heading: 'Building the Future of Indian Compliance',
        body: 'At Cloud Ledger, we are reinventing how modern businesses manage statutory compliance, taxation, and company governance. We are looking for talented compliance professionals, company secretarial specialists, and software engineers to join our growing team.'
      },
      {
        heading: 'Current Openings',
        body: '• Senior Compliance Specialist (Direct & Indirect Tax)\n• GST & TDS Filing Associate (B.Com / M.Com / Inter)\n• MCA Secretarial Lead (Company Law & ROC Filings)\n• Full-Stack React & Node.js Developer\n• Client Relationship Manager (Business Operations)'
      },
      {
        heading: 'How to Apply',
        body: 'Send your resume and a brief portfolio to careers@cloudledger.in or connect with our talent recruitment team directly on WhatsApp.'
      }
    ]
  },
  press: {
    title: 'Press & Media Relations',
    badge: 'Media Centre',
    updated: 'November 2026',
    sections: [
      {
        heading: 'About Cloud Ledger',
        body: 'Cloud Ledger (cloudledger.in) is India’s integrated business compliance and corporate advisory platform, empowering startups, SMEs, and enterprises with structured regulatory management covering 315 planned services across 15 sectors.'
      },
      {
        heading: 'Press Contact & Commentary',
        body: 'For media interviews, executive quotes on tax and company law amendments, or official press releases, please reach out to our communications desk at press@cloudledger.in.'
      }
    ]
  },
  mediaKit: {
    title: 'Brand Assets & Media Kit',
    badge: 'Brand Guidelines',
    updated: 'November 2026',
    sections: [
      {
        heading: 'Official Brand Marks',
        body: 'The Cloud Ledger logo represents precision, structured governance, and digital cloud agility. It features our signature 4 geometric diamond tiles symbolizing compliance, taxation, accounting, and advisory.'
      },
      {
        heading: 'Brand Guidelines & Asset Usage',
        body: 'When referencing Cloud Ledger in publications or partnerships, please use our primary wordmark "CLOUD LEDGER" in uppercase. For high-resolution SVG/PNG assets and media kits, contact media@cloudledger.in.'
      }
    ]
  }
}

export default function Footer() {
  const [activeModalKey, setActiveModalKey] = useState(null)

  const activeModal = activeModalKey ? MODAL_CONTENT[activeModalKey] : null

  const handleOpenModal = (key, e) => {
    if (e) e.preventDefault()
    setActiveModalKey(key)
  }

  const handleScrollTo = (id, e) => {
    if (e) e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer style={{ background: '#000000', color: '#ffffff', padding: '70px 1.5rem 35px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.1fr 1.1fr 1.2fr', gap: '3rem', marginBottom: '3rem' }}>
          
          {/* Brand Column (Social media icons removed as requested) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.2rem' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, width: 22, height: 22, transform: 'rotate(45deg)'
              }}>
                <div style={{ width: 9, height: 9, borderRadius: 2, background: '#ef4444' }} />
                <div style={{ width: 9, height: 9, borderRadius: 2, background: '#f59e0b' }} />
                <div style={{ width: 9, height: 9, borderRadius: 2, background: '#10b981' }} />
                <div style={{ width: 9, height: 9, borderRadius: 2, background: '#1e60ff' }} />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px', fontFamily: "'Inter', sans-serif" }}>
                CLOUD<span style={{ color: '#ffffff', fontWeight: 500 }}>LEDGER</span>
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: 360 }}>
              Completely integrated suite of cloud-based tools to help you with invoicing, payments, accounting, inventory management, payroll, and GST compliance.
            </p>
            <div style={{ color: '#64748b', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <i className="fas fa-shield-halved" style={{ color: '#10b981' }} />
              <span>Government Portal Aligned · ISO 27001 ISMS</span>
            </div>
          </div>

          {/* Company Column (Fully Functional) */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Company
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScrollTo('about', e)}
                  style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.84rem', transition: 'color 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo('contact', e)}
                  style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.84rem', transition: 'color 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleOpenModal('careers', e)}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleOpenModal('press', e)}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                >
                  Press
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleOpenModal('mediaKit', e)}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                >
                  Media Kit
                </button>
              </li>
            </ul>
          </div>

          {/* Usage Column (Fully Functional) */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Usage
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleOpenModal('terms', e)}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleOpenModal('privacy', e)}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleOpenModal('assured', e)}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                >
                  Assured Terms
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleOpenModal('security', e)}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                >
                  Security Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Trusted & Certified Column (Download options removed as requested) */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Trusted & Certified
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                background: 'rgba(30, 96, 255, 0.1)', border: '1.5px solid rgba(30, 96, 255, 0.4)', borderRadius: 10, padding: '8px 14px', textAlign: 'center'
              }}>
                <div style={{ color: '#38bdf8', fontSize: '0.78rem', fontWeight: 800 }}>ISMS</div>
                <div style={{ color: '#94a3b8', fontSize: '0.65rem' }}>ISO 27001:2013</div>
              </div>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)', border: '1.5px solid rgba(16, 185, 129, 0.4)', borderRadius: 10, padding: '8px 14px', textAlign: 'center'
              }}>
                <div style={{ color: '#10b981', fontSize: '0.78rem', fontWeight: 800 }}>CERTIFIED</div>
                <div style={{ color: '#94a3b8', fontSize: '0.65rem' }}>Bank-Grade 256</div>
              </div>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.6, margin: 0 }}>
              All records, GST/ITR filings, and corporate documents are housed with 256-bit encryption and role-based access.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: '#64748b' }}>
          <div>© 2026 Cloud Ledger. All rights reserved. | cloudledger.in</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button
              type="button"
              onClick={(e) => handleOpenModal('privacy', e)}
              style={{ background: 'none', border: 'none', padding: 0, color: '#64748b', fontSize: '0.78rem', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = '#ffffff'}
              onMouseLeave={e => e.target.style.color = '#64748b'}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={(e) => handleOpenModal('terms', e)}
              style={{ background: 'none', border: 'none', padding: 0, color: '#64748b', fontSize: '0.78rem', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = '#ffffff'}
              onMouseLeave={e => e.target.style.color = '#64748b'}
            >
              Terms of Use
            </button>
            <button
              type="button"
              onClick={(e) => handleOpenModal('security', e)}
              style={{ background: 'none', border: 'none', padding: 0, color: '#64748b', fontSize: '0.78rem', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = '#ffffff'}
              onMouseLeave={e => e.target.style.color = '#64748b'}
            >
              Security
            </button>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE LEGAL & COMPANY MODAL ── */}
      {activeModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem', animation: 'fadeIn 0.2s ease'
        }} onClick={() => setActiveModalKey(null)}>
          
          <div style={{
            background: '#121316', borderRadius: 24, width: '100%', maxWidth: 680,
            maxHeight: '90vh', overflowY: 'auto', padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            position: 'relative', animation: 'popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} onClick={e => e.stopPropagation()}>
            
            {/* Close button */}
            <button
              onClick={() => setActiveModalKey(null)}
              style={{
                position: 'absolute', top: 20, right: 20,
                background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '50%', width: 34, height: 34, color: '#ffffff',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
            >
              ✕
            </button>

            {/* Header */}
            <div style={{ marginBottom: '1.8rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(30, 96, 255, 0.12)', color: '#38bdf8',
                border: '1px solid rgba(30, 96, 255, 0.3)', padding: '3px 12px',
                borderRadius: 100, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 10
              }}>
                {activeModal.badge}
              </div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 6px', lineHeight: 1.3 }}>
                {activeModal.title}
              </h2>
              <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
                Status: Verified Active · {activeModal.updated}
              </div>
            </div>

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
              {activeModal.sections.map((sec, idx) => (
                <div key={idx} style={{ background: '#090a0d', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, padding: '1.2rem 1.4rem' }}>
                  <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 8px' }}>
                    {sec.heading}
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line' }}>
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              {activeModalKey === 'careers' && (
                <a
                  href={WA_CAREERS}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                  style={{ padding: '10px 20px', borderRadius: 9999, fontSize: '0.84rem' }}
                >
                  <i className="fab fa-whatsapp" /> Apply via WhatsApp
                </a>
              )}
              <button
                type="button"
                onClick={() => setActiveModalKey(null)}
                className="btn btn-white"
                style={{ padding: '10px 24px', borderRadius: 9999, fontSize: '0.84rem' }}
              >
                Close
              </button>
            </div>

          </div>

          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes popIn { from { transform: scale(0.95) translateY(15px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
          `}</style>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
