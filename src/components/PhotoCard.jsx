import { useRef, useState } from 'react'
import './PhotoCard.css'

export default function PhotoCard() {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const tiltX = (y - 0.5) * -20
    const tiltY = (x - 0.5) * 20
    setTilt({ x: tiltX, y: tiltY })
    setGlare({ x: x * 100, y: y * 100, opacity: 0.25 })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className={`photo-card ${isHovered ? 'photo-card--hovered' : ''}`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare overlay */}
      <div
        className="photo-card-glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
        }}
      />

      {/* Holographic shimmer effect */}
      <div className="photo-card-holo" />

      {/* Rainbow border glow */}
      <div className="photo-card-border-glow" />

      {/* The photo */}
      <div className="photo-card-img-wrap">
        <img src="/pija_cantik.png" alt="Faeyza Ardellein" className="photo-card-img" />
      </div>
    </div>
  )
}
