import { Link } from 'react-router-dom'

const WA_LINK = `https://wa.me/917827225372?text=Hello%20Cloud%20Ledger!`

export default function Footer() {
  return (
    <footer style={{ background: '#000000', color: '#ffffff', padding: '70px 1.5rem 35px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
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
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { icon: 'fab fa-whatsapp', href: WA_LINK },
                { icon: 'fab fa-linkedin-in', href: '#' },
                { icon: 'fab fa-twitter', href: '#' },
                { icon: 'fab fa-facebook-f', href: '#' },
              ].map(s => (
                <a key={s.icon} href={s.href} target="_blank" rel="noreferrer" style={{
                  width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.08)'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1e60ff'; e.currentTarget.style.color = '#ffffff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['About Us', 'Contact Us', 'Careers', 'Press', 'Media Kit'].map(s => (
                <li key={s}><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.84rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'} onMouseLeave={e => e.target.style.color = '#94a3b8'}>{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Usage */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Usage</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Terms & Conditions', 'Privacy Policy', 'Assured Terms', 'Security Policy'].map(s => (
                <li key={s}><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.84rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'} onMouseLeave={e => e.target.style.color = '#94a3b8'}>{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Trusted & Certified (Exact match from Image 7) */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trusted & Certified</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                background: 'rgba(30, 96, 255, 0.1)', border: '1.5px solid rgba(30, 96, 255, 0.4)', borderRadius: 10, padding: '6px 12px', textAlign: 'center'
              }}>
                <div style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 800 }}>ISMS</div>
                <div style={{ color: '#94a3b8', fontSize: '0.62rem' }}>ISO 27001:2013</div>
              </div>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)', border: '1.5px solid rgba(16, 185, 129, 0.4)', borderRadius: 10, padding: '6px 12px', textAlign: 'center'
              }}>
                <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 800 }}>CERTIFIED</div>
                <div style={{ color: '#94a3b8', fontSize: '0.62rem' }}>Bank-Grade 256</div>
              </div>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Download Mobile App:</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button style={{ background: '#12141a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: 'white', padding: '6px 12px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className="fab fa-google-play" /> Google Play
              </button>
              <button style={{ background: '#12141a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: 'white', padding: '6px 12px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className="fab fa-apple" /> App Store
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: '#64748b' }}>
          <div>© 2026 Cloud Ledger. All rights reserved. | cloudledger.in</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Use', 'Security'].map(t => (
              <a key={t} href="#" style={{ color: '#64748b', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#ffffff'} onMouseLeave={e => e.target.style.color = '#64748b'}>{t}</a>
            ))}
          </div>
        </div>
      </div>

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

