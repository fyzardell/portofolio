import { useRef, useState } from 'react'
import './IDCard.css'

export default function IDCard() {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const tiltX = (y - 0.5) * -12
    const tiltY = (x - 0.5) * 12
    setTilt({ x: tiltX, y: tiltY })
    setGlare({ x: x * 100, y: y * 100, opacity: 0.18 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <div
      ref={cardRef}
      className="id-card"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="id-card-glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
        }}
      />

      <div className="id-card-header">
        <div className="id-card-logo">
          <span className="id-logo-bracket">&lt;</span>
          <span>FD</span>
          <span className="id-logo-bracket"> /&gt;</span>
        </div>
        <span className="id-card-type">STUDENT ID</span>
      </div>

      <div className="id-card-body">
        <div className="id-card-photo">
          <img src="/pija_cantik.png" alt="Faeyza" />
        </div>

        <div className="id-card-info">
          <h3 className="id-card-name">Faeyza Ardellein</h3>
          <p className="id-card-role">Informatics Student</p>

          <div className="id-card-details">
            <div className="id-detail">
              <span className="id-detail-label">ID</span>
              <span className="id-detail-value">2024-INF-001</span>
            </div>
            <div className="id-detail">
              <span className="id-detail-label">Focus</span>
              <span className="id-detail-value">Web Dev & Data</span>
            </div>
            <div className="id-detail">
              <span className="id-detail-label">Status</span>
              <span className="id-detail-value id-status">
                <span className="status-dot" />
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="id-card-footer">
        <div className="id-card-barcode">
          {[...Array(24)].map((_, i) => (
            <span
              key={i}
              className="barcode-line"
              style={{ width: `${1 + Math.random() * 2}px` }}
            />
          ))}
        </div>
        <span className="id-card-number">NO. 00274581</span>
      </div>
    </div>
  )
}
