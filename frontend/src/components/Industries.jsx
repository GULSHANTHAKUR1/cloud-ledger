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
      background: 'linear-gradient(135deg, #0A1F44 0%, #060f22 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 20% 50%, rgba(29,185,84,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.08) 0%, transparent 50%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-badge" style={{ background: 'rgba(29,185,84,0.12)', color: '#25d466', borderColor: 'rgba(29,185,84,0.3)' }}>
          <i className="fas fa-industry" /> Industries We Serve
        </div>
        <h2 className="section-title" style={{ color: 'white' }}>
          Solutions for Every<br /><span style={{ color: '#1DB954' }}>Business Sector</span>
        </h2>
        <p className="section-desc" style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '3rem' }}>
          From sole proprietors and startups to NGOs, FPOs and institutional clients — our services are designed for the full spectrum of Indian business.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.1rem' }}>
          {INDUSTRIES.map((ind) => (
            <div key={ind.name}
              style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '1.5rem', textAlign: 'center', cursor: 'pointer',
                transition: 'all 0.3s', backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.borderColor = 'rgba(29,185,84,0.4)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
              <div style={{ fontSize: '2.4rem', marginBottom: '0.9rem' }}>{ind.icon}</div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{ind.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>{ind.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#contact" className="btn btn-whatsapp btn-lg">
            <i className="fab fa-whatsapp" /> Talk to an Expert
          </a>
        </div>
      </div>
    </section>
  )
}

