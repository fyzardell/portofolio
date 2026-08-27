import { useRef } from 'react'
import './SpotlightCard.css'

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(236, 72, 153, 0.15)',
}) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    el.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div ref={ref} className={`spotlight-card ${className}`} onMouseMove={handleMouseMove}>
      {children}
    </div>
  )
}
