import React, { useState } from 'react'
import StatCard from './StatCard'

const WA_LINK = `https://wa.me/917827225372?text=Hello%20Cloud%20Ledger!%20I%20want%20to%20enquire%20about%20your%20services.`

const QUICK_TAGS = ['GST Filing', 'ITR Filing', 'Company Registration', 'Bookkeeping', 'Audit', 'MSME']

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
        background: 'radial-gradient(circle at 50% 20%, rgba(30, 96, 255, 0.12) 0%, #050608 65%, #000000 100%)',
        display: 'flex', alignItems: 'center',
        paddingTop: 80, paddingBottom: 60, position: 'relative', overflow: 'hidden',
      }}>
        {/* Animated Background orbs & Grid */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className="hero-orb hero-orb-1" style={{ position: 'absolute', width: 550, height: 550, borderRadius: '50%', background: '#1e60ff', filter: 'blur(120px)', opacity: 0.12, top: -120, right: -120 }} />
          <div className="hero-orb hero-orb-2" style={{ position: 'absolute', width: 450, height: 450, borderRadius: '50%', background: '#10b981', filter: 'blur(120px)', opacity: 0.1, bottom: -150, left: -100 }} />
          <div className="hero-orb hero-orb-3" style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: '#8b5cf6', filter: 'blur(90px)', opacity: 0.08, top: '40%', left: '40%' }} />
          
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '1rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }} className="hero-grid-layout">
            
            {/* ── LEFT COLUMN: Text & Search ── */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#ffffff', padding: '6px 16px', borderRadius: 100,
                fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.5px',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}>
                <span style={{ width: 7, height: 7, background: '#10b981', borderRadius: '50%', animation: 'pulseDot 2s infinite' }} />
                AI-First Accounting & Compliance Platform
              </div>

              <h1 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                fontWeight: 800, color: 'white', lineHeight: 1.12, marginBottom: '1.5rem',
                letterSpacing: '-1px'
              }}>
                AI-First Accounting &<br />
                <span style={{
                  background: 'linear-gradient(135deg, #38bdf8 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>
                  Smart Compliance
                </span>
              </h1>

              <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 540 }}>
                Experience simpler, smarter invoicing, tax compliance, expense management, payroll, and accounting — unified in one automated dashboard with 100% data confidentiality.
              </p>

              {/* CTAs matching ledgers.cloud */}
              <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <a href="#services" className="btn btn-white" style={{ padding: '13px 28px', fontSize: '0.92rem' }}>
                  Get Started →
                </a>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-blue" style={{ padding: '13px 24px', fontSize: '0.92rem' }}>
                  Talk to Agent ↗
                </a>
                <a href="#calculators" className="btn" style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', padding: '13px 20px' }}>
                  <i className="fas fa-calculator" style={{ color: '#38bdf8' }} /> Tax Calculator
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
                      borderRadius: 14, border: '1.5px solid rgba(255,255,255,0.12)',
                      background: 'rgba(255,255,255,0.05)', color: 'white',
                      fontSize: '0.95rem', backdropFilter: 'blur(10px)', outline: 'none',
                      transition: 'all 0.3s', fontFamily: 'Inter, sans-serif',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                    }}
                  />
                  <button type="submit" style={{
                    position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, #1e60ff, #1952db)', border: 'none', color: 'white',
                    width: 44, height: 44, borderRadius: 10, cursor: 'pointer', fontSize: '1rem',
                    boxShadow: '0 4px 15px rgba(30,96,255,0.4)'
                  }}>
                    <i className="fas fa-search" />
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                  {QUICK_TAGS.map(tag => (
                    <button key={tag} type="button" onClick={() => quickSearch(tag)} style={{
                      background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
                      padding: '5px 14px', borderRadius: 100, fontSize: '0.78rem', fontWeight: 600,
                      cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
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
                background: '#111319', borderRadius: 14, padding: '12px 18px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', gap: 12,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                animation: 'floatBadge 4s ease-in-out infinite'
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  🛡️
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>100% Data Confidentiality</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulseDot 2s infinite' }} />
                    <span style={{ color: '#10b981', fontSize: '0.72rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Bank-Grade 256-Bit Encryption</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Left) */}
              <div className="floating-badge badge-bottom-left" style={{
                position: 'absolute', bottom: -20, left: -25, zIndex: 4,
                background: '#111319', borderRadius: 14, padding: '12px 18px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', gap: 12,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                animation: 'floatBadge 4.5s ease-in-out infinite 1.5s'
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  ⚡
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>Direct CA Consultation</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', display: 'inline-block', animation: 'pulseDot 2s infinite' }} />
                    <span style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Dedicated WhatsApp Help Desk</span>
                  </div>
                </div>
              </div>

              {/* Main Frosted Glass Compliance Standards Card */}
              <div style={{
                background: 'rgba(14, 17, 24, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 24, padding: '2rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.7)',
                position: 'relative'
              }}>
                
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                    <span style={{ color: 'white', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.3px' }}>Operations & Compliance Engine</span>
                  </div>
                  <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 800 }}>
                    ● LIVE MONITOR
                  </span>
                </div>

                {/* 4 Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.75rem' }}>
                  {[
                    { target: 315, label: 'Statutory Services', suffix: '+', accentColor: '#10b981' , extra: 'Across India'},
                    { target: 99.8, label: 'On-Time Filing Rate', suffix: '%', accentColor: '#38bdf8' , extra: 'Zero Penalties'},
                    { target: 256, label: 'Vault Encryption', suffix: '-Bit', accentColor: '#8b5cf6' , extra: 'Bank-Grade AES'},
                    { target: 100, label: 'Expert Oversight', suffix: '%', accentColor: '#f59e0b' , extra: 'Certified CA & CS'}
                  ].map((stat, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '1.1rem' }}>
                      <StatCard target={stat.target} label={stat.label} suffix={stat.suffix} accentColor={stat.accentColor} />
                      {stat.extra && (<div style={{ color: stat.accentColor, fontSize: '0.72rem', fontWeight: 700, marginTop: 4, textAlign: 'center' }}>{stat.extra}</div>)}
                    </div>
                  ))}
                </div>

                {/* Core Service Capabilities */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 12, padding: '10px 14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>📊</span>
                      <div>
                        <div style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.82rem', fontWeight: 700 }}>Automated Tax & GST Reconciliation</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Real-time ITC mismatch detection & audit readiness</div>
                      </div>
                    </div>
                    <span style={{ background: 'rgba(16,185,129,0.18)', color: '#34d399', padding: '2px 8px', borderRadius: 100, fontSize: '0.68rem', fontWeight: 700 }}>Auto-Sync</span>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 12, padding: '10px 14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>🏛️</span>
                      <div>
                        <div style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.82rem', fontWeight: 700 }}>Corporate & Startup Incorporation</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>SPICe+ MCA approval, DSC, DIN & Incorporation Certificate</div>
                      </div>
                    </div>
                    <span style={{ background: 'rgba(56,189,248,0.18)', color: '#38bdf8', padding: '2px 8px', borderRadius: 100, fontSize: '0.68rem', fontWeight: 700 }}>Fast-Track</span>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 12, padding: '10px 14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>🔒</span>
                      <div>
                        <div style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.82rem', fontWeight: 700 }}>Private Encrypted Client Vault</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Download filed returns, MCA challans & certificates 24/7</div>
                      </div>
                    </div>
                    <span style={{ background: 'rgba(245,158,11,0.18)', color: '#fbbf24', padding: '2px 8px', borderRadius: 100, fontSize: '0.68rem', fontWeight: 700 }}>AES-256</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        <style>{`
          .hero-orb-1 { animation: floatOrb 9s ease-in-out infinite; }
          .hero-orb-2 { animation: floatOrb 11s ease-in-out infinite -3s; }
          .hero-orb-3 { animation: floatOrb 8s ease-in-out infinite -5s; }

          @media (max-width: 960px) {
            .hero-grid-layout { grid-template-columns: 1fr !important; gap: 3rem !important; }
            .hero-visual-card { display: none !important; }
          }
        `}</style>
      </section>

      {/* ── STATS BAR WITH GLOW (Exact match to ledgers.cloud Image 5) ── */}
      <div style={{ background: '#050608', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '3rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
            <StatCard target={10000} label="Businesses Served" suffix="+" accentColor="#10b981" />
            <StatCard target={100} label="GST Filing Accuracy" suffix="%" accentColor="#38bdf8" />
            <StatCard target={10} label="Faster Reconciliation" suffix="x" accentColor="#8b5cf6" />
            <StatCard target={15} label="Average Onboarding" suffix=" Min" accentColor="#f59e0b" />
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

export { StatCard }
