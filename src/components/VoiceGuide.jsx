import { useState, useEffect, useRef, useCallback } from 'react'
import './VoiceGuide.css'

const tours = {
  id: [
    { id: 'home', label: 'Beranda', text: 'Hai! Kenalin, ini portofolio-nya Faeyza Ardellein Yaradhitya, atau biasa dipanggil Pija. Di sini kamu bisa kenal lebih dekat sama dia, mulai dari skill, project, sampai cara hubungin langsung. Yuk, kita jalan-jalan!' },
    { id: 'about', label: 'Tentang', text: 'Nah, ini bagian tentang Pija. Dia mahasiswa Informatika yang hobi banget ngulik teknologi, dari web development sampe data analysis. Rugi deh kalo belum kenal!' },
    { id: 'skills', label: 'Skill', text: 'Di sini keliatan skill-skill yang udah dikuasain Pija. Mulai dari HTML, CSS, JavaScript, Python, sampe data analysis. Keren-keren kan?' },
    { id: 'projects', label: 'Project', text: 'Ini beberapa project unggulan Pija. Ada game 3D, data analysis, sampe aplikasi AI. Kalo penasaran, langsung klik aja ya!' },
    { id: 'ambassador', label: 'Ambassador', text: 'Pija juga aktif sebagai Google Student Ambassador lho. Dia suka ngadain event dan sharing ilmu teknologi sama temen-temen kampusnya.' },
    { id: 'contact', label: 'Kontak', text: 'Terakhir, kalo mau ngobrol, kerja sama, atau sekadar kenalan, langsung aja hubungin Pija lewat form atau social media di sini. Ditunggu ya!' },
  ],
  en: [
    { id: 'home', label: 'Home', text: 'Hi there! This is Faeyza Ardellein Yaradhitya\'s portfolio, or you can call her Pija. Here you can get to know her better, from skills and projects to how to reach her. Let\'s take a look!' },
    { id: 'about', label: 'About', text: 'This is Pija\'s introduction. She\'s an Informatics student who loves exploring technology, from web development to data analysis. You don\'t want to miss this!' },
    { id: 'skills', label: 'Skills', text: 'Here you can see the skills Pija has mastered. From HTML, CSS, JavaScript, Python, to data analysis. Pretty impressive, right?' },
    { id: 'projects', label: 'Projects', text: 'These are some of Pija\'s featured projects. There\'s a 3D game, data analysis, and even an AI app. Feel free to check them out!' },
    { id: 'ambassador', label: 'Ambassador', text: 'Pija is also active as a Google Student Ambassador. She organizes events and shares tech knowledge with her campus peers.' },
    { id: 'contact', label: 'Contact', text: 'Lastly, if you want to chat, collaborate, or just say hi, feel free to reach out to Pija through the form or social media. She\'s looking forward to hearing from you!' },
  ],
}

export default function VoiceGuide() {
  const [lang, setLang] = useState(() => localStorage.getItem('vg-lang') || 'id')
  const [enabled, setEnabled] = useState(false)
  const [tourDone, setTourDone] = useState(() => localStorage.getItem('vg-tour-done') === 'true')
  const [tourIndex, setTourIndex] = useState(-1)
  const [tourActive, setTourActive] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)
  const synthRef = useRef(window.speechSynthesis)
  const tourTimerRef = useRef(null)

  useEffect(() => { localStorage.setItem('vg-lang', lang) }, [lang])

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel()
    setSpeaking(false)
  }, [])

  const speak = useCallback((text, onEnd) => {
    synthRef.current?.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang === 'id' ? 'id-ID' : 'en-US'
    u.rate = 1.05
    u.pitch = 1.05
    u.volume = 1
    u.onstart = () => setSpeaking(true)
    u.onend = () => { setSpeaking(false); onEnd?.() }
    u.onerror = () => { setSpeaking(false); onEnd?.() }
    synthRef.current?.speak(u)
  }, [lang])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const runTour = useCallback(() => {
    setTourActive(true)
    setTourIndex(0)
    setCardVisible(true)
  }, [])

  useEffect(() => {
    if (tourIndex < 0 || !tourActive) return
    const list = tours[lang]
    if (tourIndex >= list.length) {
      tourTimerRef.current = setTimeout(() => {
        setTourActive(false)
        setTourIndex(-1)
        setCardVisible(false)
        setTourDone(true)
        localStorage.setItem('vg-tour-done', 'true')
      }, 1000)
      return () => clearTimeout(tourTimerRef.current)
    }
    const item = list[tourIndex]
    scrollTo(item.id)
    tourTimerRef.current = setTimeout(() => {
      speak(item.text, () => {
        tourTimerRef.current = setTimeout(() => setTourIndex((i) => i + 1), 2500)
      })
    }, 800)
    return () => { clearTimeout(tourTimerRef.current); stopSpeaking() }
  }, [tourIndex, tourActive, lang, speak, stopSpeaking])

  useEffect(() => {
    if (!tourDone && !tourActive) {
      const t = setTimeout(() => {
        setShowWelcome(true)
      }, 1200)
      return () => clearTimeout(t)
    }
  }, [tourDone, tourActive])

  const current = tourActive && tourIndex >= 0 && tourIndex < tours[lang].length
    ? tours[lang][tourIndex]
    : null

  return (
    <>
      {/* Welcome Popup */}
      {showWelcome && (
        <div className="vg-overlay">
          <div className="vg-welcome">
            <div className="vg-welcome-head">
              <div className="vg-welcome-avatar">P</div>
              <div>
                <h3>Hai, aku Pija!</h3>
                <span className="vg-welcome-sub">Faeyza Ardellein Yaradhitya</span>
              </div>
            </div>
            <p>Mau aku kenalin portofolio-ku? Nanti aku ceritain tiap bagian sambil kamu jalan-jalan. Kalo udah selesai, kamu bebas explore sendiri kapan aja.</p>
            <div className="vg-welcome-row">
              <button className="vg-btn-start" onClick={() => {
                setShowWelcome(false)
                setEnabled(true)
                runTour()
              }}>
                Mulai
              </button>
              <button className="vg-btn-skip" onClick={() => {
                setShowWelcome(false)
                setTourDone(true)
                localStorage.setItem('vg-tour-done', 'true')
              }}>
                Lewati
              </button>
            </div>
            <button className="vg-lang-toggle" onClick={() => setLang(lang === 'id' ? 'en' : 'id')}>
              {lang === 'id' ? 'English' : 'Bahasa Indonesia'}
            </button>
          </div>
        </div>
      )}

      {/* Tour Guide Card */}
      {cardVisible && current && (
        <div className="vg-guide">
          <div className="vg-guide-top">
            <div className="vg-guide-progress">
              <span>{tourIndex + 1}</span>/<span>{tours[lang].length}</span>
            </div>
            <span className="vg-guide-label">{current.label}</span>
            <div className="vg-guide-dots">
              {tours[lang].map((_, i) => (
                <span key={i} className={`vg-dot ${i === tourIndex ? 'active' : i < tourIndex ? 'done' : ''}`} />
              ))}
            </div>
          </div>
          <p className="vg-guide-text">{current.text}</p>
          <div className="vg-guide-actions">
            <button className="vg-guide-btn" onClick={() => {
              stopSpeaking()
              speak(current.text)
            }}>
              {speaking ? 'Jeda' : 'Ulangi'}
            </button>
            <button className="vg-guide-btn" onClick={() => {
              stopSpeaking()
              setTourIndex((i) => i + 1)
            }}>
              {tourIndex < tours[lang].length - 1 ? 'Lanjut' : 'Selesai'}
            </button>
          </div>
        </div>
      )}

      {/* Control Buttons (after tour) */}
      {tourDone && !tourActive && (
        <>
          <button
            className={`vg-mic ${enabled ? 'on' : ''}`}
            onClick={() => {
              if (enabled) {
                setEnabled(false)
                stopSpeaking()
                setCardVisible(false)
              } else {
                setEnabled(true)
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>
          <button className="vg-lang-btn" onClick={() => setLang(lang === 'id' ? 'en' : 'id')}>
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          {enabled && (
            <button className="vg-replay" onClick={() => {
              runTour()
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M21 21v-5h-5" />
              </svg>
            </button>
          )}
        </>
      )}
    </>
  )
}
