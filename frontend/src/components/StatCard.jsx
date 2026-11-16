import React, { useState, useEffect } from 'react'

export function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const numericTarget = Number(target) || 0
    if (numericTarget <= 0) {
      setCount(numericTarget)
      return
    }

    let startTimestamp = null
    let animationFrameId = null

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.round(progress * numericTarget))
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [target, duration])

  return count
}

export default function StatCard({ target, label, suffix = '+', accentColor = 'var(--primary-2, #1DB954)' }) {
  const count = useCountUp(target)
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(2.2rem, 4vw, 3rem)',
        fontWeight: 800,
        color: accentColor,
        lineHeight: 1.1,
        letterSpacing: '-0.5px'
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        color: 'var(--gray-500, #64748b)',
        fontSize: '0.88rem',
        marginTop: 6,
        fontWeight: 500,
        letterSpacing: '0.2px'
      }}>
        {label}
      </div>
    </div>
  )
}
