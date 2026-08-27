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

  const pct = Math.min(Math.floor(progress), 100)

  return (
    <div className={`splash ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo-mark">F</div>

        <h1 className="splash-name">Faeyza Ardellein</h1>
        <p className="splash-tagline">Portfolio</p>

        <div className="splash-bar-track">
          <div
            className="splash-bar-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <span className="splash-percent">{pct}%</span>
      </div>
    </div>
  )
}
