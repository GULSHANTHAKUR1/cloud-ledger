import React, { useState } from 'react'

const RESOURCES = [
  {
    id: 'gst-checklist',
    title: 'GST Registration Checklist (2026)',
    desc: 'Complete list of required documents for Proprietorship, Partnership, LLP and Pvt Ltd entities.',
    category: 'Checklist',
    format: 'PDF Guide',
    icon: '📊',
    color: '#ecfdf5',
    items: [
      'PAN Card of Business and Authorized Signatory',
      'Aadhaar Card / Passport of Promoter / Director',
      'Electricity Bill or Property Tax Receipt (under 60 days)',
      'Rent Agreement + NOC from Property Owner (for rented premises)',
      'Bank Account Statement / Cancelled Cheque with account details'
    ]
  },
  {
    id: 'itr-checklist',
    title: 'Income Tax Return (ITR) Filing Pack',
    desc: 'Exhaustive verification list covering Form 26AS, AIS/TIS, deductions under 80C/80D and capital gains.',
    category: 'Tax Tool',
    format: 'Checklist',
    icon: '💰',
    color: '#eff6ff',
    items: [
      'Form 16 / 16A from employers and deductors',
      'Updated Annual Information Statement (AIS) and Form 26AS',
      'Bank account statements for all accounts held during the financial year',
      'Capital gains statement from brokers / mutual fund houses',
      'Proof of tax-saving investments (ELSS, PPF, Life Insurance, Medclaim)'
    ]
  },
  {
    id: 'co-checklist',
    title: 'Pvt Ltd Company Incorporation Kit',
    desc: 'Step-by-step documentation guide for DIN, DSC, SPICe+ MCA filing and bank account opening.',
    category: 'Incorporation',
    format: 'PDF Guide',
    icon: '🏢',
    color: '#fff7ed',
    items: [
      'Digital Signature Certificate (DSC) for all proposed directors',
      'Identity Proof (PAN + Voter ID / Passport / Driving License)',
      'Address Proof (Bank statement or utility bill not older than 2 months)',
      'Registered Office Proof (Utility bill + Rent Agreement + Owner NOC)',
      'Draft Memorandum of Association (MOA) and Articles of Association (AOA)'
    ]
  },
  {
    id: 'mca-calendar',
    title: 'Annual ROC Compliance Calendar',
    desc: 'Statutory compliance dates for AOC-4, MGT-7, DIR-3 KYC, DPT-3 and board meetings.',
    category: 'Compliance',
    format: 'Schedule',
    icon: '📅',
    color: '#fdf4ff',
    items: [
      'DIR-3 KYC Filing by 30th September annually',
      'Holding of Annual General Meeting (AGM) within statutory period',
      'Form AOC-4 (Financial Statements filing within 30 days of AGM)',
      'Form MGT-7 / MGT-7A (Annual Return filing within 60 days of AGM)',
      'MSME-1 and DPT-3 annual return filings'
    ]
  },
  {
    id: 'msme-guide',
    title: 'MSME / Udyam Registration Handbook',
    desc: 'Classification limits, documentation, subsidy eligibility, and priority lending guidelines.',
    category: 'MSME',
    format: 'Guide',
    icon: '🏭',
    color: '#fef3c7',
    items: [
      'Promoter Aadhaar and linked mobile number for OTP authentication',
      'Business PAN Card and GSTIN (if applicable)',
      'Bank Account Number and IFSC Code',
      'National Industry Classification (NIC) Code for products/services',
      'Details of total plant & machinery / equipment investment'
    ]
  },
  {
    id: 'ngo-kit',
    title: '12A & 80G Exemption Application Guide',
    desc: 'Documentation and eligibility norms for NGOs, Section 8 companies, and charitable trusts.',
    category: 'NGO',
    format: 'Handbook',
    icon: '🌿',
    color: '#ecfdf5',
    items: [
      'Registration Certificate and Trust Deed / MOA & AOA',
      'Last 3 years audited financial statements and annual activity report',
      'PAN Card of Trust / Society / Section 8 Entity',
      'List of Trustees / Governing Body Members with PAN and address',
      'Form 10A / 10AB online filing on Income Tax e-Filing portal'
    ]
  }
]

export default function Resources() {
  const [selectedRes, setSelectedRes] = useState(null)

  return (
    <section id="resources" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <div className="section-badge">
              <i className="fas fa-download" /> Resources & Downloads
            </div>
            <h2 className="section-title">
              Statutory Checklists &<br /><span className="accent">Compliance Guides</span>
            </h2>
            <p className="section-desc">
              Free, ready-to-use regulatory checklists and documentation kits to help your business stay audit-ready and compliant.
            </p>
          </div>
          <a href="#contact" className="btn btn-outline">
            <i className="fas fa-question-circle" /> Need Custom Documentation?
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {RESOURCES.map((res) => (
            <div key={res.id} style={{
              background: 'white', borderRadius: 16, padding: '1.75rem',
              border: '1.5px solid #f1f5f9', display: 'flex', flexDirection: 'column',
              transition: 'all 0.25s', cursor: 'pointer',
            }}
            onClick={() => setSelectedRes(res)}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#0A1F44'
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#f1f5f9'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: res.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  {res.icon}
                </div>
                <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 600 }}>
                  {res.format}
                </span>
              </div>

              <div style={{ fontWeight: 800, color: '#0A1F44', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                {res.title}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, flex: 1, marginBottom: '1.25rem' }}>
                {res.desc}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: 'auto' }}>
                <span style={{ color: '#16a34a', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <i className="fas fa-list-check" /> View Full Checklist
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>5+ Key Items</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing checklist */}
        {selectedRes && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(6, 15, 34, 0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
          }} onClick={() => setSelectedRes(null)}>
            <div style={{
              background: 'white', borderRadius: 20, maxWidth: 560, width: '100%',
              padding: '2.5rem', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            }} onClick={e => e.stopPropagation()}>
              
              <button onClick={() => setSelectedRes(null)} style={{
                position: 'absolute', top: 20, right: 20, background: '#f1f5f9', border: 'none',
                borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', color: '#64748b',
              }}>✕</button>

              <div style={{ fontSize: 32, marginBottom: 10 }}>{selectedRes.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1F44', marginBottom: 8 }}>
                {selectedRes.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                {selectedRes.desc}
              </p>

              <div style={{ background: '#f8fafc', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0A1F44', marginBottom: 10 }}>
                  Statutory Requirements:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {selectedRes.items.map((it, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.82rem', color: '#334155' }}>
                      <i className="fas fa-check-circle" style={{ color: '#16a34a', marginTop: 3 }} />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <a href={`https://wa.me/917827225372?text=Hello%20Cloud%20Ledger!%20I%20need%20help%20with%20${encodeURIComponent(selectedRes.title)}`} target="_blank" rel="noreferrer"
                   className="btn btn-whatsapp" style={{ flex: 1, justifyContent: 'center' }}>
                  <i className="fab fa-whatsapp" /> Inquire via WhatsApp
                </a>
                <button onClick={() => setSelectedRes(null)} className="btn btn-navy" style={{ padding: '10px 20px' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

