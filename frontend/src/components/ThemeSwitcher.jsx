import React, { useState, useEffect } from 'react'

const THEMES = [
  { id: 'cyber-emerald', name: 'Cyber Emerald', color: '#1DB954', desc: 'Classic High-Trust CA & Fintech' },
  { id: 'sapphire-cyan', name: 'Sapphire Cyan', color: '#06B6D4', desc: 'Modern Silicon Valley / Stripe Vibe' },
  { id: 'obsidian-gold', name: 'Obsidian Gold', color: '#F59E0B', desc: 'Ultra-Luxury Wealth & Corporate Law' },
  { id: 'violet-mint',   name: 'Violet Mint',   color: '#8B5CF6', desc: 'Futuristic Web3 & NextGen FinOps' },
]

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('cyber-emerald')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cl_theme') || 'cyber-emerald'
    setCurrentTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const switchTheme = (id) => {
    setCurrentTheme(id)
    localStorage.setItem('cl_theme', id)
    document.documentElement.setAttribute('data-theme', id)
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 1100 }}>
      {/* Floating Trigger Button */}
      <div style={{
        background: 'rgba(10,31,68,0.95)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100,
        padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 8px 25px rgba(0,0,0,0.3)', cursor: 'pointer'
      }} onClick={() => setOpen(!open)}>
        <span style={{ fontSize: '1rem' }}>🎨</span>
        <span style={{ color: 'white', fontSize: '0.78rem', fontWeight: 700 }}>
          Theme: <span style={{ color: THEMES.find(t => t.id === currentTheme)?.color }}>{THEMES.find(t => t.id === currentTheme)?.name}</span>
        </span>
        <i className={`fas fa-chevron-${open ? 'down' : 'up'}`} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }} />
      </div>

      {/* Palette Popover Menu */}
      {open && (
        <div style={{
          position: 'absolute', bottom: '115%', left: 0, width: 260,
          background: 'rgba(6,15,34,0.98)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16,
          padding: '12px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', display: 'grid', gap: 6
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.5, padding: '4px 6px' }}>
            Curated Color Palettes
          </div>
          {THEMES.map(theme => (
            <div
              key={theme.id}
              onClick={() => { switchTheme(theme.id); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s',
                background: currentTheme === theme.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: currentTheme === theme.id ? `1.5px solid ${theme.color}` : '1.5px solid transparent'
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: '50%', background: theme.color,
                boxShadow: `0 0 10px ${theme.color}66`, flexShrink: 0
              }} />
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>{theme.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.68rem' }}>{theme.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

