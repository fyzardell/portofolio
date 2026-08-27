import { useState, useEffect } from 'react'
import './Footer.css'

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-logo">
            <span className="logo-text">Faeyza</span>
          </span>
          <p className="footer-text">
            Informatics student passionate about technology and creating
            meaningful solutions.
          </p>
        </div>

        <div className="footer-links">
          <a href="https://github.com/fyzardell" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fa-brands fa-github" />
          </a>
          <a href="https://www.instagram.com/fyzardell/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fa-brands fa-instagram" />
          </a>
          <a href="https://linkedin.com/in/fyzardell" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin-in" />
          </a>
          <a href="mailto:faeyzaardellein@gmail.com" aria-label="Email">
            <i className="fa-solid fa-envelope" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>{new Date().getFullYear()} Faeyza Ardellein. All rights reserved.</span>
          <span className="footer-note">Built with React &amp; Vite</span>
        </div>
      </div>

      <button
        className={`back-to-top ${showTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="fa-solid fa-chevron-up" />
      </button>
    </footer>
  )
}
