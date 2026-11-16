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
      background: scrolled ? 'rgba(6,15,34,0.98)' : 'rgba(10,31,68,0.97)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '0 2rem',
      height: scrolled ? '62px' : '72px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
    }}>
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 38, height: 38, background: 'linear-gradient(135deg,#1DB954,#17a248)',
          borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, boxShadow: '0 4px 15px rgba(29,185,84,0.4)'
        }}>☁️</div>
        <span style={{ color: 'white', fontSize: '1.25rem', fontWeight: 800 }}>
          Cloud<span style={{ color: '#1DB954' }}>Ledger</span>
        </span>
      </a>

      {/* Desktop nav */}
      <ul style={{ display: 'flex', gap: '0.2rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}
          className="desktop-nav">
        {navLinks.map(link => (
          <li key={link.href}>
            <a href={link.href} style={{
              color: activeSection === link.href.slice(1) ? '#25d466' : 'rgba(255,255,255,0.8)',
              textDecoration: 'none', fontSize: '0.86rem', fontWeight: 600,
              padding: '8px 14px', borderRadius: 8,
              background: activeSection === link.href.slice(1) ? 'rgba(29,185,84,0.1)' : 'transparent',
              transition: 'all 0.2s',
            }}>{link.label}</a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-whatsapp"
           style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
          <i className="fab fa-whatsapp" /> WhatsApp
        </a>
        <Link to="/login" className="btn btn-green" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
          <i className="fas fa-sign-in-alt" /> Portal Login
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
          background: 'rgba(6,15,34,0.98)', backdropFilter: 'blur(20px)',
          padding: '1.2rem 2rem', display: 'flex', flexDirection: 'column', gap: 8,
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
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ flex: 1, justifyContent: 'center' }}>
              <i className="fab fa-whatsapp" /> WhatsApp
            </a>
            <Link to="/login" onClick={() => setMobileOpen(false)} className="btn btn-green" style={{ flex: 1, justifyContent: 'center' }}>
              <i className="fas fa-sign-in-alt" /> Login
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
