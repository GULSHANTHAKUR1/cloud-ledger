import React, { useState, useEffect, useRef } from 'react'

const WA_LINK = `https://wa.me/917827225372?text=Hello%20Cloud%20Ledger!%20I%20want%20to%20enquire%20about%20your%20services.`

const QUICK_TAGS = ['GST Filing', 'ITR Filing', 'Company Registration', 'Bookkeeping', 'Audit', 'MSME']

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current) return
    ref.current = true
    const step = target / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      setCount(Math.round(current))
      if (current >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])

  return count
}

function StatCard({ target, label, suffix = '+' }) {
  const count = useCountUp(target)
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: '#0A1F44', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 6, fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function Hero() {
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (!search.trim()) return
    const el = document.getElementById('services')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    window.dispatchEvent(new CustomEvent('service-search', { detail: search }))
  }

  const quickSearch = (term) => {
    setSearch(term)
    const el = document.getElementById('services')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    window.dispatchEvent(new CustomEvent('service-search', { detail: term }))
  }

  return (
    <>
      {/* ── HERO ── */}
      <section id="hero" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #060f22 0%, #0A1F44 55%, #0d2b4f 100%)',
        display: 'flex', alignItems: 'center',
        paddingTop: 80, paddingBottom: 60, position: 'relative', overflow: 'hidden',
      }}>
        {/* Animated Background orbs & Grid */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className="hero-orb hero-orb-1" style={{ position: 'absolute', width: 550, height: 550, borderRadius: '50%', background: '#1DB954', filter: 'blur(100px)', opacity: 0.12, top: -120, right: -120 }} />
          <div className="hero-orb hero-orb-2" style={{ position: 'absolute', width: 450, height: 450, borderRadius: '50%', background: '#3b82f6', filter: 'blur(100px)', opacity: 0.12, bottom: -150, left: -100 }} />
          <div className="hero-orb hero-orb-3" style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: '#f59e0b', filter: 'blur(80px)', opacity: 0.08, top: '40%', left: '40%' }} />
          
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '1rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }} className="hero-grid-layout">
            
            {/* ── LEFT COLUMN: Text & Search ── */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(29,185,84,0.12)', border: '1px solid rgba(29,185,84,0.35)',
                color: '#25d466', padding: '6px 16px', borderRadius: 100,
                fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.5px',
                textTransform: 'uppercase', marginBottom: '1.5rem',
                boxShadow: '0 0 20px rgba(29,185,84,0.2)'
              }}>
                <span style={{ width: 7, height: 7, background: '#1DB954', borderRadius: '50%', animation: 'pulseDot 2s infinite' }} />
                India's Integrated Business Management Platform
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                fontWeight: 800, color: 'white', lineHeight: 1.12, marginBottom: '1.5rem',
              }}>
                Smart Business<br />
                Management &<br />
                <span style={{ color: '#1DB954', textShadow: '0 0 30px rgba(29,185,84,0.3)' }}>Compliance Hub</span>
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 540 }}>
                Cloud Ledger is India's premier digital compliance & business advisory platform. We manage your GST, Income Tax, Company Incorporations, and Statutory Filings with 100% data confidentiality and zero late-fee penalties.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <a href="#services" className="btn btn-green btn-lg">
                  <i className="fas fa-th-large" /> Explore 315 Services
                </a>
                <a href="#calculators" className="btn" style={{ background: 'rgba(255,255,255,0.09)', color: 'white', border: '1px solid rgba(255,255,255,0.22)' }}>
                  <i className="fas fa-calculator" style={{ color: '#1DB954' }} /> Tax Calculator
                </a>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">
                  <i className="fab fa-whatsapp" /> WhatsApp
                </a>
              </div>

              {/* Search Box */}
              <form onSubmit={handleSearch}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search services: GST, ITR, Company Registration, Audit..."
                    style={{
                      width: '100%', padding: '16px 60px 16px 20px',
                      borderRadius: 14, border: '1.5px solid rgba(255,255,255,0.18)',
                      background: 'rgba(255,255,255,0.08)', color: 'white',
                      fontSize: '0.95rem', backdropFilter: 'blur(10px)', outline: 'none',
                      transition: 'all 0.3s', fontFamily: 'Inter, sans-serif',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                    }}
                  />
                  <button type="submit" style={{
                    position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, #1DB954, #17a248)', border: 'none', color: 'white',
                    width: 44, height: 44, borderRadius: 10, cursor: 'pointer', fontSize: '1rem',
                    boxShadow: '0 4px 15px rgba(29,185,84,0.4)'
                  }}>
                    <i className="fas fa-search" />
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                  {QUICK_TAGS.map(tag => (
                    <button key={tag} type="button" onClick={() => quickSearch(tag)} style={{
                      background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)',
                      padding: '5px 14px', borderRadius: 100, fontSize: '0.78rem', fontWeight: 600,
                      cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)',
                      transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                    }}>{tag}</button>
                  ))}
                </div>
              </form>
            </div>

            {/* ── RIGHT COLUMN: Customer Trust & Feature Showcase ── */}
            <div style={{ position: 'relative' }} className="hero-visual-card">
              
              {/* Floating Badge 1 (Top Right) */}
              <div className="floating-badge badge-top-right" style={{
                position: 'absolute', top: -25, right: -20, zIndex: 4,
                background: 'white', borderRadius: 14, padding: '12px 18px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', gap: 12,
                animation: 'floatBadge 4s ease-in-out infinite'
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#ecfdf5', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  🛡️
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#0A1F44', fontSize: '0.85rem' }}>100% Data Confidentiality</div>
                  <div style={{ color: '#16a34a', fontSize: '0.72rem', fontWeight: 600 }}>Bank-Grade 256-Bit Encryption</div>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Left) */}
              <div className="floating-badge badge-bottom-left" style={{
                position: 'absolute', bottom: -20, left: -25, zIndex: 4,
                background: 'white', borderRadius: 14, padding: '12px 18px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', gap: 12,
                animation: 'floatBadge 4.5s ease-in-out infinite 1.5s'
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  ⚡
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#0A1F44', fontSize: '0.85rem' }}>Direct CA Consultation</div>
                  <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Dedicated WhatsApp Help Desk</div>
                </div>
              </div>

              {/* Main Frosted Glass Compliance Standards Card */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 24, padding: '2rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                position: 'relative'
              }}>
                
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1DB954', boxShadow: '0 0 10px #1DB954' }} />
                    <span style={{ color: 'white', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.3px' }}>Enterprise Compliance Excellence</span>
                  </div>
                  <span style={{ background: 'rgba(29,185,84,0.18)', color: '#25d466', padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 800 }}>
                    ● VERIFIED STANDARDS
                  </span>
                </div>

                {/* 4 Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.75rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '1.1rem' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>315+</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', marginTop: 4 }}>Statutory Services</div>
                    <div style={{ color: '#25d466', fontSize: '0.72rem', fontWeight: 700, marginTop: 4 }}>Across India</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '1.1rem' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>99.8%</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', marginTop: 4 }}>On-Time Filing Rate</div>
                    <div style={{ color: '#38bdf8', fontSize: '0.72rem', fontWeight: 700, marginTop: 4 }}>Zero Penalties</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '1.1rem' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>256-Bit</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', marginTop: 4 }}>Vault Encryption</div>
                    <div style={{ color: '#fbbf24', fontSize: '0.72rem', fontWeight: 700, marginTop: 4 }}>Bank-Grade AES</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '1.1rem' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>100%</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', marginTop: 4 }}>Expert Oversight</div>
                    <div style={{ color: '#25d466', fontSize: '0.72rem', fontWeight: 700, marginTop: 4 }}>Certified CA & CS</div>
                  </div>
                </div>

                {/* Core Service Capabilities */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 12, padding: '10px 14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>📊</span>
                      <div>
                        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem', fontWeight: 700 }}>Automated Tax & GST Reconciliation</div>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>Real-time ITC mismatch detection & audit readiness</div>
                      </div>
                    </div>
                    <span style={{ background: 'rgba(29,185,84,0.2)', color: '#4ade80', padding: '2px 8px', borderRadius: 100, fontSize: '0.68rem', fontWeight: 700 }}>Guaranteed</span>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 12, padding: '10px 14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>🏛️</span>
                      <div>
                        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem', fontWeight: 700 }}>Corporate & Startup Incorporation</div>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>SPICe+ MCA approval, DSC, DIN & Incorporation Certificate</div>
                      </div>
                    </div>
                    <span style={{ background: 'rgba(56,189,248,0.2)', color: '#38bdf8', padding: '2px 8px', borderRadius: 100, fontSize: '0.68rem', fontWeight: 700 }}>Fast-Track</span>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 12, padding: '10px 14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>🔒</span>
                      <div>
                        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem', fontWeight: 700 }}>Private Encrypted Client Vault</div>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>Download filed returns, MCA challans & certificates 24/7</div>
                      </div>
                    </div>
                    <span style={{ background: 'rgba(245,158,11,0.2)', color: '#fbbf24', padding: '2px 8px', borderRadius: 100, fontSize: '0.68rem', fontWeight: 700 }}>AES-256</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        <style>{`
          @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
          @keyframes floatBadge {
            0%,100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes floatOrb {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.05); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
          }
          .hero-orb-1 { animation: floatOrb 9s ease-in-out infinite; }
          .hero-orb-2 { animation: floatOrb 11s ease-in-out infinite -3s; }
          .hero-orb-3 { animation: floatOrb 8s ease-in-out infinite -5s; }

          @media (max-width: 960px) {
            .hero-grid-layout { grid-template-columns: 1fr !important; gap: 3rem !important; }
            .hero-visual-card { display: none !important; }
          }
        `}</style>
      </section>

      {/* ── STATS BAR WITH GLOW ── */}
      <div style={{ background: 'white', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '2.5rem 1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
            <StatCard target={315} label="Service Target Plan" />
            <StatCard target={15} label="Service Categories" />
            <StatCard target={500} label="Satisfied Clients" />
            <StatCard target={99} label="Statutory Compliance" suffix="%" />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .container > div { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  )
}
