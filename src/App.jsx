import { useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplashScreen from './components/SplashScreen'
import PinkCursor from './components/PinkCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Ambassador from './components/Ambassador'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)

  const handleSplashComplete = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (loading) return

    const ctx = gsap.context(() => {
      // Scroll reveals
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 45 },
          {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        )
      })

      // Parallax for shapes
      gsap.utils.toArray('.hero-gradient-1, .hero-gradient-2').forEach((el) => {
        gsap.to(el, {
          y: -60,
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [loading])

  return (
    <>
      {loading && <SplashScreen onComplete={handleSplashComplete} />}
      {!loading && (
        <>
          <PinkCursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <TechStack />
            <Skills />
            <Projects />
            <Ambassador />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
