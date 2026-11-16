import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const WA_NUMBER = '917827225372'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hello%20Cloud%20Ledger!%20I%20want%20to%20enquire%20about%20your%20services.`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['features', 'services', 'calculators', 'about', 'resources', 'industries', 'knowledge', 'contact']
      const current = sections.find(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
      })
      setActiveSection(current || '')
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#services', label: 'Services' },
    { href: '#calculators', label: 'Calculators' },
    { href: '#about', label: 'About Us' },
    { href: '#resources', label: 'Resources' },
    { href: '#industries', label: 'Industries' },
    { href: '#knowledge', label: 'Knowledge' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.82)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0 2rem',
      height: scrolled ? '64px' : '72px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.8)' : 'none',
    }}>
      {/* Brand Logo with 4 geometric diamond tiles */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, width: 22, height: 22, transform: 'rotate(45deg)'
        }}>
          <div style={{ width: 9, height: 9, borderRadius: 2, background: '#ef4444' }} />
          <div style={{ width: 9, height: 9, borderRadius: 2, background: '#f59e0b' }} />
          <div style={{ width: 9, height: 9, borderRadius: 2, background: '#10b981' }} />
          <div style={{ width: 9, height: 9, borderRadius: 2, background: '#1e60ff' }} />
        </div>
        <span style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.3px', fontFamily: "'Inter', sans-serif" }}>
          CLOUD<span style={{ color: '#ffffff', fontWeight: 500 }}>LEDGER</span>
        </span>
      </a>

      {/* Desktop nav */}
      <ul style={{ display: 'flex', gap: '0.4rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}
          className="desktop-nav">
        {navLinks.map(link => (
          <li key={link.href}>
            <a href={link.href} style={{
              color: activeSection === link.href.slice(1) ? '#ffffff' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none', fontSize: '0.86rem', fontWeight: 500,
              padding: '6px 14px', borderRadius: 8,
              background: activeSection === link.href.slice(1) ? 'rgba(255,255,255,0.08)' : 'transparent',
              transition: 'all 0.2s',
            }}>{link.label}</a>
          </li>
        ))}
      </ul>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-blue"
           style={{ padding: '8px 20px', borderRadius: 9999, fontSize: '0.84rem' }}>
          Talk to Agent ↗
        </a>
        <Link to="/login" className="btn btn-navy" style={{ padding: '8px 20px', borderRadius: 9999, fontSize: '0.84rem' }}>
          Login
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: '1.3rem', cursor: 'pointer', padding: 6 }}
          className="mobile-menu-btn">
          <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(5, 6, 8, 0.98)', backdropFilter: 'blur(20px)',
          padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: 10,
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
               style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', padding: '10px 0',
                        fontSize: '0.95rem', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-blue" style={{ flex: 1, justifyContent: 'center' }}>
              Talk to Agent ↗
            </a>
            <Link to="/login" onClick={() => setMobileOpen(false)} className="btn btn-navy" style={{ flex: 1, justifyContent: 'center' }}>
              Login
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
