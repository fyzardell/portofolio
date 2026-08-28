import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import RotatingText from './RotatingText'
import PhotoCard from './PhotoCard'
import GradientBg from './GradientBg'
import './Hero.css'

function TypewriterName() {
  const fullText = 'Faeyza Ardellein'
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(fullText.slice(0, i))
      if (i >= fullText.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className={`typewriter-name ${done ? 'done' : ''}`}>
      {displayed}
      {!done && <span className="typewriter-cursor">|</span>}
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl
        .fromTo('.hero-greeting', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo('.hero-name', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
        .fromTo('.hero-socials', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '+=0.6')
        .fromTo('.hero-social-item', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06 }, '-=0.2')
        .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.1')
        .fromTo('.hero-desc', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-actions', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.hero-stats .stat', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, '-=0.1')
        .fromTo('.photo-card', { opacity: 0, y: 40, rotateY: -10 }, { opacity: 1, y: 0, rotateY: 0, duration: 0.9, ease: 'power2.out' }, '-=0.6')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-bg">
        <GradientBg
          colors={['#ec4899', '#a855f7', '#3b82f6', '#f472b6', '#c084fc', '#f9a8d4']}
          speed={1.0}
          blur={80}
        />
      </div>

      <div className="container hero-content">
        <div className="hero-text">
          <p className="hero-greeting">Hello, I am</p>

          <h1 className="hero-name">
            <TypewriterName />
          </h1>

          <div className="hero-socials">
            <a href="https://github.com/fyzardell" target="_blank" rel="noopener noreferrer" className="hero-social-item">
              <i className="fa-brands fa-github" />
            </a>
            <a href="https://www.instagram.com/fyzardell/" target="_blank" rel="noopener noreferrer" className="hero-social-item">
              <i className="fa-brands fa-instagram" />
            </a>
            <a href="https://www.linkedin.com/in/faeyza-ardellein-yaradhitya-053a0b431/" target="_blank" rel="noopener noreferrer" className="hero-social-item">
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a href="mailto:fardellein@gmail.com" className="hero-social-item">
              <i className="fa-solid fa-envelope" />
            </a>
          </div>

          <h2 className="hero-subtitle">
            <RotatingText
              words={['Developer', 'Data Analyst', 'Problem Solver', 'Learner']}
              interval={2800}
            />
          </h2>

          <p className="hero-desc">
            Informatics student focused on creating practical solutions through
            web development and data analysis. Experienced in building web applications,
            analyzing datasets, and collaborating on technical projects.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              View Projects <i className="fa-solid fa-arrow-right" />
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">3+</span>
              <span className="stat-lbl">Projects</span>
            </div>
            <div className="stat-div" />
            <div className="stat">
              <span className="stat-num">6</span>
              <span className="stat-lbl">Technologies</span>
            </div>
            <div className="stat-div" />
            <div className="stat">
              <span className="stat-num">1+</span>
              <span className="stat-lbl">Year of Study</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <PhotoCard />
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
