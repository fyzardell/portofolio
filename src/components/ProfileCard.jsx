import { useRef, useState } from 'react'
import './ProfileCard.css'

export default function ProfileCard() {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ x: (y - 0.5) * -14, y: (x - 0.5) * 14 })
    setGlare({ x: x * 100, y: y * 100, opacity: 0.2 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <div
      ref={cardRef}
      className="profile-card"
      style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="profile-card-glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
        }}
      />
      <div className="profile-card-bg" />

      <div className="profile-card-content">
        <div className="profile-avatar-wrap">
          <img src="/pija_cantik.png" alt="Faeyza Ardellein" className="profile-avatar" />
          <div className="profile-status">
            <span className="profile-status-dot" />
          </div>
        </div>

        <h3 className="profile-name">Faeyza Ardellein</h3>
        <p className="profile-role">Informatics Student</p>

        <div className="profile-divider" />

        <div className="profile-info">
          <div className="profile-info-row">
            <span className="profile-info-label">University</span>
            <span className="profile-info-value">Informatics Student</span>
          </div>
          <div className="profile-info-row">
            <span className="profile-info-label">Focus</span>
            <span className="profile-info-value">Web Dev & Data</span>
          </div>
          <div className="profile-info-row">
            <span className="profile-info-label">Location</span>
            <span className="profile-info-value">Indonesia</span>
          </div>
        </div>

        <div className="profile-divider" />

        <div className="profile-socials">
          <a href="https://github.com/fyzardell" target="_blank" rel="noopener noreferrer" className="profile-social">
            <i className="fa-brands fa-github" />
          </a>
          <a href="https://www.instagram.com/fyzardell/" target="_blank" rel="noopener noreferrer" className="profile-social">
            <i className="fa-brands fa-instagram" />
          </a>
          <a href="mailto:faeyzaardellein@gmail.com" className="profile-social">
            <i className="fa-solid fa-envelope" />
          </a>
        </div>
      </div>
    </div>
  )
}
