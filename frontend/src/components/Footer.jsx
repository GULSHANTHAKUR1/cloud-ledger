import { Link } from 'react-router-dom'

const WA_LINK = `https://wa.me/917827225372?text=Hello%20Cloud%20Ledger!`

export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary-1, #0A1F44)', color: '#ffffff', padding: '60px 1.5rem 30px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, var(--primary-2, #1DB954), #17a248)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>☁️</div>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Cloud<span style={{ color: 'var(--primary-2, #1DB954)' }}>Ledger</span></span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: 360 }}>
              Professional business services for Indian businesses — GST, Income Tax, Company Registration, Accounting, Audit and more.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { icon: 'fab fa-whatsapp', href: WA_LINK },
                { icon: 'fab fa-linkedin-in', href: '#' },
                { icon: 'fab fa-twitter', href: '#' },
                { icon: 'fab fa-facebook-f', href: '#' },
              ].map(s => (
                <a key={s.icon} href={s.href} target="_blank" rel="noreferrer" style={{
                  width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-2, #1DB954)'; e.currentTarget.style.color = '#ffffff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1rem' }}>Services</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['GST & Indirect Tax', 'Income Tax Filing', 'Company Registration', 'Bookkeeping', 'Audit & Assurance', 'All Services →'].map(s => (
                <li key={s}><a href="#services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--primary-2, #1DB954)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1rem' }}>Company</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['About Us', 'Industries', 'Knowledge Centre', 'Resources', 'Privacy Policy', 'Disclaimer'].map(s => (
                <li key={s}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--primary-2, #1DB954)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1rem' }}>Contact</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: '📱 +91 78272 25372', href: 'tel:+917827225372' },
                { label: '📧 hello@cloudledger.in', href: 'mailto:hello@cloudledger.in' },
                { label: '💬 WhatsApp Chat', href: WA_LINK },
                { label: '🌐 cloudledger.in', href: 'https://cloudledger.in' },
              ].map(c => (
                <li key={c.label}><a href={c.href} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--primary-2, #1DB954)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>{c.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
          <div>© 2026 Cloud Ledger. All rights reserved. | cloudledger.in</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Use', 'Disclaimer'].map(t => (
              <a key={t} href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = 'var(--primary-2, #1DB954)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>{t}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

