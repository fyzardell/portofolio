import { useState, useEffect } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setFadeOut(true)
          setTimeout(() => onComplete(), 600)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 120)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`splash ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo">
          <span className="splash-name">Faeyza Ardellein Yaradhitya</span>
        </div>

        <div className="splash-bar-track">
          <div
            className="splash-bar-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="splash-status">
          <span className="splash-loading-text">Loading portfolio</span>
          <span className="splash-percent">{Math.min(Math.floor(progress), 100)}%</span>
        </div>
      </div>

      <div className="splash-decorations">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="splash-particle"
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.4}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
