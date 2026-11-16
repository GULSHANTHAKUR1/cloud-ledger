import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const WA_NUMBER = '917827225372'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hello%20Cloud%20Ledger!%20I%20want%20to%20enquire%20about%20your%20services.`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const navLinks = [
    { href: '#features', label: 'Features', icon: '⚡' },
    { href: '#services', label: 'Services', icon: '📋' },
    { href: '#calculators', label: 'Calculators', icon: '🧮' },
    { href: '#about', label: 'About Us', icon: '🏛️' },
    { href: '#resources', label: 'Resources', icon: '📥' },
    { href: '#industries', label: 'Industries', icon: '🏭' },
    { href: '#knowledge', label: 'Knowledge', icon: '📰' },
    { href: '#contact', label: 'Contact', icon: '✉️' },
  ]

  // Track active section on scroll for both desktop & mobile nav
  useEffect(() => {
    const sectionIds = ['contact', 'knowledge', 'industries', 'resources', 'about', 'calculators', 'services', 'features', 'hero']
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setScrolled(scrollY > 20)

          const scrollPosition = scrollY + 140
          for (const id of sectionIds) {
            const el = document.getElementById(id)
            if (el) {
              const top = el.offsetTop
              if (scrollPosition >= top) {
                setActiveSection(id)
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll handler with sticky header offset
  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const headerOffset = 115
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveSection(id)
    }
  }

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      {/* ── MAIN TOP NAVIGATION BAR ── */}
      <nav
        className="main-navbar-bar"
        style={{
          background: scrolled ? 'rgba(0, 0, 0, 0.96)' : 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0 2rem',
          height: scrolled ? '62px' : '70px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.8)' : 'none',
        }}
      >
        {/* Brand Logo with 4 geometric diamond tiles */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, width: 22, height: 22, transform: 'rotate(45deg)'
          }}>
            <div style={{ width: 9, height: 9, borderRadius: 2, background: '#ef4444' }} />
            <div style={{ width: 9, height: 9, borderRadius: 2, background: '#f59e0b' }} />
            <div style={{ width: 9, height: 9, borderRadius: 2, background: '#10b981' }} />
            <div style={{ width: 9, height: 9, borderRadius: 2, background: '#1e60ff' }} />
          </div>
          <span style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.3px', fontFamily: "'Inter', sans-serif" }}>
            CLOUD<span style={{ color: '#ffffff', fontWeight: 500 }}>LEDGER</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul style={{ display: 'flex', gap: '0.35rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}
            className="desktop-nav">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
                    textDecoration: 'none', fontSize: '0.86rem', fontWeight: 500,
                    padding: '6px 13px', borderRadius: 8,
                    background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: isActive ? '1px solid rgba(255,255,255,0.14)' : '1px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Top Right CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp header-wa-btn"
            style={{ padding: '8px 16px', borderRadius: 9999, fontSize: '0.82rem' }}
          >
            <i className="fab fa-whatsapp" /> <span className="header-wa-label">WhatsApp</span>
          </a>

          <Link
            to="/login"
            className="btn btn-navy"
            style={{ padding: '8px 18px', borderRadius: 9999, fontSize: '0.84rem' }}
          >
            Login
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile navigation menu"
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'white',
              borderRadius: 10,
              width: 38,
              height: 38,
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background 0.2s'
            }}
          >
            <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE HORIZONTAL HEADER NAVIGATION STRIP (Always accessible on mobile) ── */}
      <div className="mobile-header-nav-strip">
        <div className="mobile-nav-scroll-container">
          {navLinks.map(link => {
            const sectionKey = link.href.slice(1)
            const isActive = activeSection === sectionKey
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`mobile-nav-pill ${isActive ? 'active' : ''}`}
              >
                <span style={{ marginRight: 5, fontSize: '0.8rem' }}>{link.icon}</span>
                <span>{link.label}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* ── EXPANDABLE MOBILE MENU DRAWER ── */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(5, 6, 8, 0.98)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '1.5rem 1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: 6,
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          maxHeight: 'calc(100vh - 120px)', overflowY: 'auto',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.9)',
          animation: 'slideDown 0.25s ease'
        }}>
          <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
            Navigation Sections
          </div>

          {navLinks.map(link => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.85)',
                  textDecoration: 'none', padding: '11px 14px', minHeight: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontSize: '0.92rem', fontWeight: 600,
                  background: isActive ? 'rgba(30, 96, 255, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: isActive ? '1px solid rgba(30, 96, 255, 0.35)' : '1px solid rgba(255,255,255,0.04)',
                  borderRadius: 10,
                  transition: 'all 0.15s'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1rem' }}>{link.icon}</span>
                  <span>{link.label}</span>
                </span>
                <i className="fas fa-chevron-right" style={{ fontSize: '0.72rem', color: isActive ? '#38bdf8' : '#475569' }} />
              </a>
            )
          })}

          <div style={{ display: 'flex', gap: 10, marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
            >
              <i className="fab fa-whatsapp" /> WhatsApp
            </a>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="btn btn-navy"
              style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
            >
              Login
            </Link>
          </div>
        </div>
      )}

      <style>{`
        /* Mobile horizontal scrollable header strip */
        .mobile-header-nav-strip {
          display: none;
          background: rgba(8, 10, 14, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 8px 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
        }
        .mobile-header-nav-strip::-webkit-scrollbar {
          display: none;
        }
        .mobile-nav-scroll-container {
          display: flex;
          gap: 8px;
          align-items: center;
          width: max-content;
        }
        .mobile-nav-pill {
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
        }
        .mobile-nav-pill.active {
          background: #1e60ff;
          color: #ffffff;
          border-color: #1e60ff;
          box-shadow: 0 2px 10px rgba(30, 96, 255, 0.45);
        }
        .mobile-nav-pill:active {
          transform: scale(0.96);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-header-nav-strip { display: flex !important; }
          .main-navbar-bar { padding: 0 1.25rem !important; }
        }

        @media (max-width: 480px) {
          .main-navbar-bar { padding: 0 0.85rem !important; }
          .header-wa-label { display: none; }
          .header-wa-btn { padding: 8px 12px !important; }
        }
      `}</style>
    </header>
  )
}
