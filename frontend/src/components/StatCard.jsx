import React, { useState, useEffect, useRef } from 'react'

export function useCountUp(target, duration = 1000, isVisible = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const numericTarget = Number(target) || 0
    if (numericTarget <= 0) {
      setCount(numericTarget)
      return
    }

    let startTimestamp = null
    let animationFrameId = null
    let lastRendered = 0
    let lastTime = 0

    const step = (timestamp) => {
      if (!startTimestamp) {
        startTimestamp = timestamp
        lastTime = timestamp
      }
      const elapsed = timestamp - startTimestamp
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(easeOut * numericTarget)

      if (timestamp - lastTime >= 40 || progress >= 1) {
        if (current !== lastRendered || progress >= 1) {
          lastRendered = current
          setCount(current)
        }
        lastTime = timestamp
      }

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
  }, [target, duration, isVisible])

  return count
}

export default function StatCard({ target, label, suffix = '+', accentColor = 'var(--primary-2, #1DB954)' }) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef(null)

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })

    if (domRef.current) observer.observe(domRef.current)
    return () => observer.disconnect()
  }, [])

  const count = useCountUp(target, 1000, isVisible)

  return (
    <div ref={domRef} style={{ textAlign: 'center' }}>
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
