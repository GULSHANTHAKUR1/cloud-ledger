const INDUSTRIES = [
  { icon: '🏭', name: 'SMEs & Startups', desc: 'GST, ITR, Incorporation, Payroll' },
  { icon: '🏢', name: 'Pvt Ltd / LLP / OPC', desc: 'MCA Filing, ROC, Annual Compliance' },
  { icon: '🌿', name: 'NGOs & Trusts', desc: '12A/80G, FCRA Support, Section 8' },
  { icon: '🌾', name: 'FPOs & Agriculture', desc: 'FPO Accounting, Compliance, Reports' },
  { icon: '⚙️', name: 'Manufacturing', desc: 'Cost Audit, MIS, Internal Controls' },
  { icon: '🛒', name: 'Trading & Retail', desc: 'GST Reconciliation, Stock Audit' },
  { icon: '👩‍💼', name: 'Professionals', desc: 'ITR, TDS, Advance Tax Planning' },
  { icon: '🏛️', name: 'Institutions', desc: 'Environmental Studies, Feasibility' },
]

export default function Industries() {
  return (
    <section id="industries" style={{
      background: '#000000',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '5rem 0',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 20% 50%, rgba(30,96,255,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.06) 0%, transparent 50%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-badge" style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8', borderColor: 'rgba(56,189,248,0.25)' }}>
          <i className="fas fa-industry" /> Industries We Serve
        </div>
        <h2 className="section-title" style={{ color: '#ffffff' }}>
          Solutions for Every<br />
          <span style={{
            background: 'linear-gradient(135deg, #38bdf8 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Business Sector
          </span>
        </h2>
        <p className="section-desc" style={{ color: '#94a3b8', marginBottom: '3rem' }}>
          From sole proprietors and startups to NGOs, FPOs and institutional clients — our services are designed for the full spectrum of Indian business.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.1rem' }}>
          {INDUSTRIES.map((ind) => (
            <div key={ind.name}
              style={{
                background: '#0d1118', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14, padding: '1.5rem', textAlign: 'center', cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
              <div style={{ fontSize: '2.4rem', marginBottom: '0.9rem' }}>{ind.icon}</div>
              <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{ind.name}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{ind.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#contact" className="btn btn-blue" style={{ padding: '12px 28px' }}>
            <i className="fab fa-whatsapp" style={{ marginRight: 6 }} /> Consult with Specialist
          </a>
        </div>
      </div>
    </section>
  )
}

