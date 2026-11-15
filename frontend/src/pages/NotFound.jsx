import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A1F44', textAlign: 'center', padding: '2rem' }}>
      <div>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>☁️</div>
        <div style={{ fontSize: '5rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>404</div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', margin: '1rem 0 2rem' }}>This page doesn't exist.</div>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1DB954', color: 'white', padding: '12px 28px', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

