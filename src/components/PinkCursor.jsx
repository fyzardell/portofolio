import { useEffect, useRef, useState } from 'react'
import './PinkCursor.css'

const PARTICLES = [
  { char: '✦', colors: ['#ec4899', '#f472b6', '#f9a8d4'] },
  { char: '✿', colors: ['#a855f7', '#c084fc', '#e9d5ff'] },
  { char: '♡', colors: ['#f43f5e', '#fb7185', '#fda4af'] },
  { char: '✧', colors: ['#ec4899', '#a855f7', '#f472b6'] },
  { char: '♪', colors: ['#f472b6', '#c084fc', '#f9a8d4'] },
  { char: '❀', colors: ['#fb7185', '#f472b6', '#e9d5ff'] },
]

export default function PinkCursor() {
  const dotRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    let mx = -100, my = -100

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = `${mx}px`
      dot.style.top = `${my}px`
    }

    const checkHover = (e) => {
      const target = e.target
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.classList.contains('interactive') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    let lastP = 0
    const spawn = (e) => {
      const now = Date.now()
      if (now - lastP < 60) return
      lastP = now

      const p = PARTICLES[Math.floor(Math.random() * PARTICLES.length)]
      const color = p.colors[Math.floor(Math.random() * p.colors.length)]

      const el = document.createElement('span')
      el.className = 'sparkle-p'
      el.textContent = p.char
      el.style.cssText = `
        position:fixed;left:${e.clientX}px;top:${e.clientY}px;
        pointer-events:none;z-index:99996;
        color:${color};font-size:${10 + Math.random() * 10}px;
        --dx:${(Math.random() - 0.5) * 50}px;
        --dy:${-15 - Math.random() * 40}px;
        --rot:${Math.random() * 360}deg;
      `
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 700)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', checkHover)
    window.addEventListener('mousemove', spawn)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', checkHover)
      window.removeEventListener('mousemove', spawn)
    }
  }, [])

  return (
    <>
      {/* Pink arrow cursor */}
      <div ref={dotRef} className={`pink-cursor-dot ${isHovered ? 'hover' : ''}`}>
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1L7.5 19.5L10.5 12.5L18.5 9.5L1 1Z"
            fill="url(#cursorGrad)"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="cursorGrad" x1="1" y1="1" x2="19" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ec4899" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  )
}
