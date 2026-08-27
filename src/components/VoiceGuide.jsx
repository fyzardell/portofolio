import { useState, useEffect, useRef, useCallback } from 'react'
import './VoiceGuide.css'

const guides = {
  en: [
    {
      id: 'home',
      title: 'Welcome!',
      text: 'This is Faeyza\'s portfolio. Here you can see projects, skills, and how to get in touch. Let me guide you through!',
      icon: '👋',
    },
    {
      id: 'about',
      title: 'About Me',
      text: 'Here is a brief introduction about Faeyza. An Informatics student who enjoys learning technology and solving problems.',
      icon: '🧑‍💻',
    },
    {
      id: 'skills',
      title: 'Skills',
      text: 'These are the technical and soft skills Faeyza has developed, including web development, data analysis, and more.',
      icon: '⚡',
    },
    {
      id: 'projects',
      title: 'Projects',
      text: 'Check out some featured projects built by Faeyza, from games to data analysis and AI applications.',
      icon: '🚀',
    },
    {
      id: 'contact',
      title: 'Contact',
      text: 'Want to collaborate or have questions? Reach out through the form or social media links here.',
      icon: '✉️',
    },
  ],
  id: [
    {
      id: 'home',
      title: 'Selamat Datang!',
      text: 'Ini adalah portofolio Faeyza. Di sini kamu bisa lihat project, skill, dan cara menghubungi. Aku akan pandu kamu!',
      icon: '👋',
    },
    {
      id: 'about',
      title: 'Tentang Saya',
      text: 'Ini adalah perkenalan singkat tentang Faeyza. Mahasiswa Informatika yang suka belajar teknologi dan menyelesaikan masalah.',
      icon: '🧑‍💻',
    },
    {
      id: 'skills',
      title: 'Keahlian',
      text: 'Ini adalah skill teknis dan soft skill yang sudah dikembangkan Faeyza, termasuk web development, data analysis, dan lainnya.',
      icon: '⚡',
    },
    {
      id: 'projects',
      title: 'Proyek',
      text: 'Lihat beberapa project unggulan yang dibuat Faeyza, mulai dari game, data analysis, sampai aplikasi AI.',
      icon: '🚀',
    },
    {
      id: 'contact',
      title: 'Kontak',
      text: 'Mau kerja sama atau ada pertanyaan? Hubungi lewat form atau media sosial di sini.',
      icon: '✉️',
    },
  ],
}

export default function VoiceGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState(() => localStorage.getItem('vg-lang') || 'id')
  const [activeSection, setActiveSection] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const [enabled, setEnabled] = useState(() => localStorage.getItem('vg-enabled') === 'true')
  const [showWelcome, setShowWelcome] = useState(false)
  const [hasWelcomed, setHasWelcomed] = useState(() => localStorage.getItem('vg-welcomed') === 'true')
  const synthRef = useRef(window.speechSynthesis)
  const sectionObserverRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('vg-lang', lang)
  }, [lang])

  useEffect(() => {
    localStorage.setItem('vg-enabled', enabled)
  }, [enabled])

  const speak = useCallback((text) => {
    if (!synthRef.current) return
    synthRef.current.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = lang === 'id' ? 'id-ID' : 'en-US'
    utter.rate = 1
    utter.pitch = 1.1
    utter.volume = 0.9
    utter.onstart = () => setSpeaking(true)
    utter.onend = () => setSpeaking(false)
    utter.onerror = () => setSpeaking(false)
    synthRef.current.speak(utter)
  }, [lang])

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setSpeaking(false)
    }
  }, [])

  const playWelcome = useCallback(() => {
    if (hasWelcomed) return
    setShowWelcome(true)
    setHasWelcomed(true)
    localStorage.setItem('vg-welcomed', 'true')
    const welcomeText = lang === 'id'
      ? 'Selamat datang di portofolio Faeyza! Aktifkan panduan suara untuk dipandu menjelajahi situs ini.'
      : 'Welcome to Faeyza\'s portfolio! Enable voice guide to be guided through this site.'
    setTimeout(() => speak(welcomeText), 500)
  }, [hasWelcomed, lang, speak])

  useEffect(() => {
    const timer = setTimeout(playWelcome, 1500)
    return () => clearTimeout(timer)
  }, [playWelcome])

  useEffect(() => {
    if (!enabled) return

    const sections = document.querySelectorAll('section[id]')
    if (sections.length === 0) return

    sectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            const guideList = guides[lang]
            const idx = guideList.findIndex((g) => g.id === id)
            if (idx !== -1) {
              setActiveSection(idx)
              speak(guideList[idx].text)
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach((s) => sectionObserverRef.current.observe(s))

    return () => {
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect()
      }
      stopSpeaking()
    }
  }, [enabled, lang, speak, stopSpeaking])

  const guideList = guides[lang]
  const current = guideList[activeSection]

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`vg-toggle ${enabled ? 'active' : ''}`}
        onClick={() => {
          setEnabled(!enabled)
          if (enabled) stopSpeaking()
        }}
        title={enabled ? 'Matikan Panduan' : 'Nyalakan Panduan'}
      >
        {enabled ? '🔊' : '🔇'}
      </button>

      {/* Language Toggle */}
      {enabled && (
        <button
          className="vg-lang"
          onClick={() => {
            stopSpeaking()
            setLang(lang === 'id' ? 'en' : 'id')
          }}
        >
          {lang === 'id' ? '🇮🇩 ID' : '🇺🇸 EN'}
        </button>
      )}

      {/* Welcome Popup */}
      {showWelcome && (
        <div className="vg-welcome-overlay" onClick={() => setShowWelcome(false)}>
          <div className="vg-welcome" onClick={(e) => e.stopPropagation()}>
            <div className="vg-welcome-icon">🎉</div>
            <h3>{lang === 'id' ? 'Selamat Datang!' : 'Welcome!'}</h3>
            <p>
              {lang === 'id'
                ? 'Aktifkan panduan suara untuk dipandu menjelajahi portofolio ini. Kamu juga bisa mengganti bahasa.'
                : 'Enable voice guide to be guided through this portfolio. You can also switch languages.'}
            </p>
            <div className="vg-welcome-actions">
              <button className="vg-btn-primary" onClick={() => {
                setEnabled(true)
                setShowWelcome(false)
              }}>
                {lang === 'id' ? 'Nyalakan Panduan' : 'Enable Guide'}
              </button>
              <button className="vg-btn-secondary" onClick={() => setShowWelcome(false)}>
                {lang === 'id' ? 'Nanti Saja' : 'Maybe Later'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guide Card */}
      {enabled && (
        <div className="vg-card">
          <div className="vg-card-header">
            <span className="vg-card-icon">{current?.icon}</span>
            <span className="vg-card-title">{current?.title}</span>
            <div className="vg-card-actions">
              <button
                className="vg-card-btn"
                onClick={() => speak(current?.text)}
                title={lang === 'id' ? 'Ulangi' : 'Replay'}
              >
                {speaking ? '⏸️' : '▶️'}
              </button>
              <button
                className="vg-card-btn"
                onClick={() => {
                  stopSpeaking()
                  setIsOpen(!isOpen)
                }}
              >
                {isOpen ? '▼' : '▲'}
              </button>
            </div>
          </div>
          {isOpen && (
            <div className="vg-card-body">
              <p>{current?.text}</p>
              <div className="vg-progress">
                {guideList.map((_, i) => (
                  <span
                    key={i}
                    className={`vg-dot ${i === activeSection ? 'active' : ''} ${i < activeSection ? 'done' : ''}`}
                    onClick={() => {
                      const el = document.getElementById(guideList[i].id)
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
